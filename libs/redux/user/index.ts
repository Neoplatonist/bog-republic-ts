/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { Mycelium, UserObjectSchema } from '@/libs/types';
import { AddMycelium, SubtractMycelium } from '@/libs/myceliumMath';
import UserApi from './api';

const FETCH_USER_FAILED = 'Error fetching userApi data';

const UserStateSchema = z.object({
  data: UserObjectSchema,
  errors: z.array(z.string()).nullable(),
});

export type UserState = z.infer<typeof UserStateSchema>;

const initialState = {
  data: {
    mycelium: 0.0,
    myceliumNotation: 0,
  },
  errors: null,
} as UserState;

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
        {
          mycelium: payload.mycelium,
          myceliumNotation: payload.myceliumNotation,
        }
      );

      state.data = { ...state.data, ...newMycelium };
    },
    SubtractFromMycelium: (state, { payload }: { payload: Mycelium }) => {
      if (
        payload.myceliumNotation > state.data.myceliumNotation ||
        payload.mycelium >= state.data.mycelium
      ) {
        console.info('Cannot subtract more mycelium than you have');
        state.errors = ['Cannot subtract more mycelium than you have'];
        return;
      }

      const newMycelium = SubtractMycelium(
        {
          mycelium: state.data.mycelium,
          myceliumNotation: state.data.myceliumNotation,
        },
        {
          mycelium: payload.mycelium,
          myceliumNotation: payload.myceliumNotation,
        }
      );

      state.data = { ...state.data, ...newMycelium };
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(
        UserApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          // console.log({ getUserFulfilledAction: payload });

          // Check if query response matches schema
          const user = UserObjectSchema.safeParse(payload);
          // console.log({ userAcceptedPayload: user });
          // console.log({ userAcceptedSuccess: user.success });

          // Handle schema check errors
          if (!user.success) {
            // console.log({ userAcceptedErrors: user.error.issues });
            // error.forEach((err) => console.error(err));
            state.errors = [
              FETCH_USER_FAILED,
              'UserAPI -> getUser typecheck failed',
              ...user.error.issues.map(
                (issue) => `${issue.path[0]}: ${issue.message}`
              ),
            ];
            return;
          }

          // Handle schema check success; update state
          state.data = { ...state.data, ...user.data };
          state.errors = null;
        }
      )
      .addMatcher(UserApi.endpoints.getUser.matchRejected, (state) => {
        // console.log({ getUserRejectedAction: payload });
        state.errors = [FETCH_USER_FAILED, 'UserAPI -> getUser rejected'];
      });

    return {
      // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
      // This allows for rehydration of the store from the server
      // while on the client side.
      // This is needed for SSR and SSG.
      [HYDRATE]: (state: RootState, action: PayloadAction<any>) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.user?.data;

        // keep existing state or use hydrated state
        const data = wasBumpedOnClient ? state.user : action.payload.user;

        const newState = {
          ...state.user,
          ...action.payload.user,
          // keep existing state or use hydrated
          ...data,
        };

        return newState;
      },
    };
  },
});

export const { AddToMycelium, SubtractFromMycelium } = slice.actions;
export const userReducer = slice.reducer;

export const selectUser = (state: RootState) => state?.[slice.name].data;
export const selectUserMycelium = (state: RootState): Mycelium => ({
  mycelium: state?.[slice.name].data?.mycelium,
  myceliumNotation: state?.[slice.name].data?.myceliumNotation,
});

export default slice;
