/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { Mycelium, UserObjectSchema } from '@/libs/types';
import { AddMycelium, SubtractMycelium } from '@/libs/myceliumMath';
import UserApi from './api';

// Constants
const FETCH_USER_FAILED = 'Error fetching userApi data';
const INSUFFICIENT_MYCELIUM = 'Cannot subtract more mycelium than you have';

// Types
type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};

// Schemas
const UserStateSchema = z.object({
  data: UserObjectSchema,
  errors: z.array(z.string()).nullable(),
});

export type UserState = z.infer<typeof UserStateSchema>;

// Initial State
const initialState = {
  data: {},
  errors: null,
} as UserState;

// Slice
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddToMycelium: (state, { payload }: { payload: Mycelium }) => {
      const newMycelium = AddMycelium(
        {
          mycelium: state.data.mycelium,
          myceliumNotation: state.data.myceliumNotation,
        },
        payload
      );
      state.data = { ...state.data, ...newMycelium };
    },

    SubtractFromMycelium: (state, { payload }: { payload: Mycelium }) => {
      if (
        payload.myceliumNotation > state.data.myceliumNotation ||
        payload.mycelium >= state.data.mycelium
      ) {
        state.errors = [INSUFFICIENT_MYCELIUM];
        return;
      }

      const newMycelium = SubtractMycelium(
        {
          mycelium: state.data.mycelium,
          myceliumNotation: state.data.myceliumNotation,
        },
        payload
      );
      state.data = { ...state.data, ...newMycelium };
    },
  },

  extraReducers: (builder) => {
    builder
      // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
      // This allows for rehydration of the store from the server
      // while on the client side.
      // This is needed for SSR and SSG.
      .addCase(HYDRATE, (state: UserState, action: HydrateAction) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.user?.data;

        if (!action.payload.user) return state;

        return {
          ...state,
          ...action.payload.user,
          data: wasBumpedOnClient ? state.data : action.payload.user.data,
        } as UserState;
      })

      // Handle successful user fetch
      .addMatcher(
        UserApi.endpoints.getUser.matchFulfilled,
        (
          state,
          action: PayloadAction<
            NonNullable<ReturnType<typeof UserApi.endpoints.getUser.select>>
          >
        ) => {
          const user = UserObjectSchema.safeParse(action.payload);

          if (!user.success) {
            state.errors = [
              FETCH_USER_FAILED,
              'UserAPI -> getUser typecheck failed',
              ...user.error.issues.map(
                (issue) => `${issue.path[0]}: ${issue.message}`
              ),
            ];
            return;
          }

          state.data = { ...state.data, ...user.data };
          state.errors = null;
        }
      )

      // Handle failed user fetch
      .addMatcher(UserApi.endpoints.getUser.matchRejected, (state) => {
        state.errors = [FETCH_USER_FAILED, 'UserAPI -> getUser rejected'];
      });
  },
});

// Exports
export const { AddToMycelium, SubtractFromMycelium } = slice.actions;
export const userReducer = slice.reducer;

// Selectors
export const selectUser = (state: RootState) => state?.[slice.name].data;
export const selectUserMycelium = (state: RootState): Mycelium => ({
  mycelium: state?.[slice.name].data?.mycelium,
  myceliumNotation: state?.[slice.name].data?.myceliumNotation,
});

export default slice;
