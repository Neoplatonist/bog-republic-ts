/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { Mycelium, UserTerrainsObjectListSchema } from '@/libs/types';
import { AddMycelium, SubtractMycelium } from '@/libs/myceliumMath';
import UserTerrainsApi from './api';

// Constants
const FETCH_USERTERRAINS_FAILED = 'Error fetching userApi data';

// Schemas
const UserTerrainsStateSchema = z.object({
  data: UserTerrainsObjectListSchema,
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
      { payload }: PayloadAction<Partial<UserTerrainsState>>
    ) => {
      // First check if payload exists and has data
      if (payload?.data) {
        try {
          const processedData = Array.isArray(payload.data)
            ? payload.data.map((terrain) => ({
                ...terrain,
                isContributionLocked: false,
              }))
            : payload.data;

          console.log({ processedData });

          const parsedData = UserTerrainsObjectListSchema.parse(processedData);

          state.data = parsedData;
          state.errors = null;
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Provide more detailed error messages
            state.errors = [
              'Hydrate User Terrains failed: Data validation error',
              ...error.errors.map(
                (err) => `${err.path.join('.')}: ${err.message}`
              ),
            ];
          } else {
            state.errors = ['Hydrate User Terrains failed: Unknown error'];
          }
        }
      }

      // Handle errors if present in the payload
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
        (state, action) => {
          try {
            // Use parse with a try-catch for better error reporting
            const parsedData = UserTerrainsObjectListSchema.parse(
              action.payload
            );

            // Merge the new data with existing data
            state.data = { ...state.data, ...parsedData };
            state.errors = null;
          } catch (error) {
            if (error instanceof z.ZodError) {
              // Provide more detailed error messages
              state.errors = [
                FETCH_USERTERRAINS_FAILED,
                'Data validation error',
                ...error.errors.map(
                  (err) => `${err.path.join('.')}: ${err.message}`
                ),
              ];
            } else {
              state.errors = [
                FETCH_USERTERRAINS_FAILED,
                'Unknown error processing data',
              ];
            }
          }
        }
      )

      // Handle failed user fetch
      .addMatcher(
        UserTerrainsApi.endpoints.getUserTerrains.matchRejected,
        (state) => {
          state.errors = [
            FETCH_USERTERRAINS_FAILED,
            'UserAPI -> getUserTerrains rejected',
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
