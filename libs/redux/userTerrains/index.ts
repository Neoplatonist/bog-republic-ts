/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { Mycelium, UserTerrainsObjectSchema } from '@/libs/types';
import { AddMycelium, SubtractMycelium } from '@/libs/myceliumMath';
import UserTerrainsApi from './api';

// Constants
const FETCH_USERTERRAINS_FAILED = 'Error fetching userApi data';

// Schemas
const UserTerrainsStateSchema = z.object({
  data: UserTerrainsObjectSchema,
  errors: z.array(z.string()).nullable(),
});

export type UserTerrainsState = z.infer<typeof UserTerrainsStateSchema>;

// Initial State
const initialState = {
  data: {},
  errors: null,
} as UserTerrainsState;

// Slice
const slice = createSlice({
  name: 'userTerrains' as const, // type the name as a constant
  initialState,
  reducers: {
    hydrateUserTerrains: (
      state,
      { payload }: PayloadAction<UserTerrainsState>
    ) => {
      if (payload?.data) {
        const userTerrainsData = UserTerrainsObjectSchema.safeParse(
          payload.data
        );

        if (userTerrainsData.success) {
          state.data = userTerrainsData.data;
          state.errors = null;
        } else {
          state.errors = [
            'Hydrate User failed',
            ...userTerrainsData.error.issues.map(
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
        UserTerrainsApi.endpoints.getUserTerrains.matchFulfilled,
        (
          state,
          action: PayloadAction<
            NonNullable<
              ReturnType<
                typeof UserTerrainsApi.endpoints.getUserTerrains.select
              >
            >
          >
        ) => {
          const userTerrains = UserTerrainsObjectSchema.safeParse(
            action.payload
          );

          if (!userTerrains.success) {
            state.errors = [
              FETCH_USERTERRAINS_FAILED,
              'UserAPI -> getUser typecheck failed',
              ...userTerrains.error.issues.map(
                (issue) => `${issue.path[0]}: ${issue.message}`
              ),
            ];
            return;
          }

          state.data = { ...state.data, ...userTerrains.data };
          state.errors = null;
        }
      )

      // Handle failed user fetch
      .addMatcher(
        UserTerrainsApi.endpoints.getUserTerrains.matchRejected,
        (state) => {
          state.errors = [
            FETCH_USERTERRAINS_FAILED,
            'UserAPI -> getUser rejected',
          ];
        }
      );
  },
});

// Exports
export const { hydrateUserTerrains } = slice.actions;
export const userTerrainsReducer = slice.reducer;

// Selectors
export const selectUserTerrains = (state: RootState) => state.userTerrains.data;

export default slice;
