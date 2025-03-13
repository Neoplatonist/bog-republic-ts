/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { Mycelium, UserObjectSchema } from '@/libs/types';
import { AddMycelium, SubtractMycelium } from '@/libs/myceliumMath';
import UserApi from './api';

// Constants
const FETCH_USER_FAILED = 'Error fetching userApi data';
const INSUFFICIENT_MYCELIUM = 'Cannot subtract more mycelium than you have';

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
  name: 'user' as const, // type the name as a constant
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
    hydrateUser: (state, { payload }: PayloadAction<UserState>) => {
      if (payload?.data) {
        const userData = UserObjectSchema.safeParse(payload.data);

        if (userData.success) {
          state.data = userData.data;
          state.errors = null;
        } else {
          state.errors = [
            'Hydrate User failed',
            ...userData.error.issues.map(
              (issue) => `${issue.path[0]}: ${issue.message}`
            ),
          ];
        }
      }

      if (payload?.errors) {
        state.errors = payload.errors;
      }
    },
  },

  extraReducers: (builder) => {
    builder
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
export const selectUser = (state: RootState) => state.user.data;
export const selectUserMycelium = (state: RootState): Mycelium => ({
  mycelium: state.user.data?.mycelium,
  myceliumNotation: state.user.data?.myceliumNotation,
});

export default slice;
