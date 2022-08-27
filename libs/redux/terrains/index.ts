/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import { TerrainObjectListSchema } from '@/libs/types';
import type { RootState } from '@/libs/redux';

const TerrainStateSchema = z.object({
  data: TerrainObjectListSchema,
  error: z.array(z.string()).nullable(),
});

export type TerrainState = z.infer<typeof TerrainStateSchema>;

const initialState = {
  data: [],
  error: null,
} as TerrainState;

const slice = createSlice({
  name: 'terrains',
  initialState,
  reducers: {
    setTerrains: (state, { payload }) => {
      state.data = [...payload];
      state.error = null;
    },
  },
});

export const { setTerrains } = slice.actions;
export const selectTest = (state: RootState) => state?.[slice.name].data;

export default slice;
