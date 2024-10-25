/* eslint-disable no-param-reassign */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diff } from 'jsondiffpatch';
import { HYDRATE } from 'next-redux-wrapper';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/libs/redux';
import { z } from 'zod';
import { MyceliumObject, UserObject, UserObjectSchema } from '@/libs/types';
import {
  AddMycelium,
  GreaterThanOrEqualTo,
  SubtractMycelium,
} from '@/libs/myceliumMath';
import UserApi from './api';

/**
 * Error message for when fetching UserApi data fails.
 */
const FETCH_USER_FAILED = 'Error fetching UserApi data';

/**
 * Schema for the UserState object.
 */
const UserStateSchema = z.object({
  data: UserObjectSchema,
  errors: z.array(z.string()).nullable(),
});

/**
 * Type representing the UserState.
 */
export type UserState = z.infer<typeof UserStateSchema>;

/**
 * Initial state for the userSlice.
 */
const initialState = {
  data: {
    mycelium: 0.0,
    myceliumNotation: 0,
  },
  errors: null,
} as UserState;

/**
 * Redux slice for managing user-related state.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Action to increase mycelium in the user state.
     */
    IncreaseMycelium: (state, { payload }: { payload: MyceliumObject }) => {
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
    /**
     * Action to decrease mycelium in the user state.
     */
    DecreaseMycelium: (state, { payload }: { payload: MyceliumObject }) => {
      const canSubtract = GreaterThanOrEqualTo(
        {
          mycelium: state.data.mycelium,
          myceliumNotation: state.data.myceliumNotation,
        },
        payload
      );

      if (!canSubtract) {
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
  extraReducers: (builder) => {
    const HydrateState = createAction(HYDRATE);

    builder
      // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
      // This allows for rehydration of the store from the server while on the client side.
      // This is needed for SSR and SSG.
      .addCase(HydrateState, (state: RootState, action: PayloadAction<any>) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.user?.data;

        // Keep existing state or use hydrated state
        const data = wasBumpedOnClient ? state.user : action.payload.user;

        // Update state with new data
        return {
          ...state.user,
          ...action.payload.user,
          // keep existing state or use hydrated
          ...data,
        };
      })
      .addMatcher(
        UserApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          // Check if query response matches schema
          const user = UserObjectSchema.safeParse(payload);

          // Handle schema check errors
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

          // Handle schema check success; update state
          state.data = { ...state.data, ...user.data };
          state.errors = null;
        }
      )
      .addMatcher(UserApi.endpoints.getUser.matchRejected, (state) => {
        state.errors = [FETCH_USER_FAILED, 'UserAPI -> getUser rejected'];
      });
  },
});

/**
 * Action creators generated for each case reducer function.
 */
export const { IncreaseMycelium, DecreaseMycelium } = userSlice.actions;

/**
 * Selector function to get the user data from the Redux store.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {UserState['data']} - The user data.
 */
export const selectUser = (state: RootState): UserObject =>
  state?.[userSlice.name].data;

/**
 * Selector function to get the mycelium object from the user data in the Redux store.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {MyceliumObject} - The mycelium object containing mycelium and myceliumNotation.
 */
export const selectUserMycelium = (state: RootState): MyceliumObject => ({
  mycelium: state?.[userSlice.name].data?.mycelium,
  myceliumNotation: state?.[userSlice.name].data?.myceliumNotation,
});

export default userSlice;
