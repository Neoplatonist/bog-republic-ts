/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { TerrainObjectListSchema } from '@/libs/types';

type HydrateAction = {
  type: typeof HYDRATE;
  payload: RootState;
};

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
  name: 'terrains',
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
  },
  extraReducers: (builder) => {
    // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
    // This allows for rehydration of the store from the server
    // while on the client side.
    // This is needed for SSR and SSG.
    builder.addCase(HYDRATE, (state: TerrainState, action: HydrateAction) => {
      const stateDiff = diff(state, action.payload);
      const wasBumpedOnClient = stateDiff?.terrains?.data;

      if (!action.payload.terrains) {
        return state;
      }

      return {
        ...state,
        ...action.payload.terrains,
        data: wasBumpedOnClient ? state.data : action.payload.terrains.data,
      } as TerrainState;
    });
  },
});

export const { setTerrains, setTerrainError } = slice.actions;
export const selectTerrains = (state: RootState) => state?.[slice.name].data;
export const selectTerrainErrors = (state: RootState): string[] | null =>
  state?.[slice.name].errors;

export default slice;
