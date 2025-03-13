/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { TerrainObjectListSchema } from '@/libs/types';
import TerrainsApi from './api';

const TerrainStateSchema = z.object({
  data: TerrainObjectListSchema,
  errors: z.array(z.string()).nullable(),
});

export type TerrainState = z.infer<typeof TerrainStateSchema>;

const initialState = {
  data: [],
  errors: null,
} as TerrainState;

const slice = createSlice({
  name: 'terrains' as const, // type the name as a constant
  initialState,
  reducers: {
    setTerrains: (state, { payload }) => {
      const terrainsData = TerrainObjectListSchema.safeParse(payload);

      if (!terrainsData.success) {
        state.data = [];
        state.errors = [
          ...terrainsData.error.issues.map(
            (issue) =>
              `TerrainAPI -> getTerrains typecheck failed -> ${issue.path[0]}: ${issue.message}`
          ),
        ];
      }

      if (terrainsData.success) {
        state.data = terrainsData.data;
        state.errors = null;
      }
    },
    setTerrainError: (state, { payload }) => {
      if (payload == null) {
        state.errors = null;
      } else if (state.errors == null) {
        state.errors = [payload];
      } else {
        state.errors = [...state.errors, payload];
      }
    },
    hydrateTerrains: (state, { payload }: PayloadAction<TerrainState>) => {
      if (payload?.data?.length > 0) {
        state.data = payload.data;
        state.errors = null;
      } else {
        state.errors = ['Hydrate Terrains failed'];
      }

      if (payload?.errors) {
        state.errors = payload.errors;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // Handle successful terrains fetch
      TerrainsApi.endpoints.getTerrains.matchFulfilled,
      (state, action) => {
        const terrainsData = TerrainObjectListSchema.safeParse(action.payload);

        if (!terrainsData.success) {
          state.data = [];
          state.errors = [
            ...terrainsData.error.issues.map(
              (issue) =>
                `TerrainAPI -> getTerrains typecheck failed -> ${issue.path[0]}: ${issue.message}`
            ),
          ];
        }

        if (terrainsData.success) {
          state.data = terrainsData.data;
          state.errors = null;
        }
      }
    );
  },
});

export const { setTerrains, setTerrainError, hydrateTerrains } = slice.actions;
export const selectTerrains = (state: RootState) => state.terrains.data;
export const selectTerrainErrors = (state: RootState): string[] | null =>
  state.terrains.errors;

export default slice;
