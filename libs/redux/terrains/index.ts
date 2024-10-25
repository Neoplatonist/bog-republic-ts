/* eslint-disable no-param-reassign */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diff } from 'jsondiffpatch';
import { HYDRATE } from 'next-redux-wrapper';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/libs/redux';
import { z } from 'zod';
import { TerrainObjectList, TerrainObjectListSchema } from '@/libs/types';
import TerrainsApi from './api';

const FETCH_TERRAINS_FAILED = 'Error fetching terrainsApi data';

const TerrainStateSchema = z.object({
  data: TerrainObjectListSchema,
  errors: z.array(z.string()).nullable(),
});

export type TerrainState = z.infer<typeof TerrainStateSchema>;

const initialState = {
  data: [],
  errors: null,
} as TerrainState;

const terrainsSlice = createSlice({
  name: 'terrains',
  initialState,
  reducers: {
    /**
     * setTerrains is a reducer function that sets the terrains data in the state.
     * It takes the state and a payload containing the terrains data as input.
     * If the payload passes the type check, it updates the state with the new data.
     * If the payload fails the type check, it updates the state with an empty data array
     * and sets the errors array with type check error messages.
     */
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
    /**
     * setTerrainError is a reducer function that sets a terrain error in the state.
     * It takes the state and a payload containing the error string or null as input.
     * If the payload is null, it clears the errors array in the state.
     * If the errors array is null, it sets the errors array with the payload as a single element.
     * Otherwise, it appends the payload to the existing errors array.
     */
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
    const HydrateState = createAction(HYDRATE);

    builder
      // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
      // This allows for rehydration of the store from the server
      // while on the client side.
      // This is needed for SSR and SSG.
      .addCase(HydrateState, (state: RootState, action: PayloadAction<any>) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.terrains?.data;

        // keep existing state or use hydrated state
        const data = wasBumpedOnClient
          ? state.terrains
          : action.payload.terrains;

        // New State
        return {
          ...state.terrains,
          ...action.payload.terrains,
          // keep existing state or use hydrated
          ...data,
        };
      })
      .addMatcher(
        TerrainsApi.endpoints.getTerrains.matchFulfilled,
        (state, { payload }) => {
          // Check if query response matches schema
          const terrains = TerrainObjectListSchema.safeParse(payload);

          // Handle schema check errors
          if (!terrains.success) {
            state.errors = [
              FETCH_TERRAINS_FAILED,
              'TerrainsApi -> getTerrains typecheck failed',
              ...terrains.error.issues.map(
                (issue) => `${issue.path[0]}: ${issue.message}`
              ),
            ];
            return;
          }

          // Handle schema check success; update state
          state.data = [...state.data, ...terrains.data];
          state.errors = null;
        }
      )
      .addMatcher(TerrainsApi.endpoints.getTerrains.matchRejected, (state) => {
        state.errors = [
          FETCH_TERRAINS_FAILED,
          'TerrainsApi -> getTerrains rejected',
        ];
      });
  },
});

/**
 * Action creators generated for each case reducer function.
 */
export const { setTerrains, setTerrainError } = terrainsSlice.actions;

/**
 * selectTerrains is a selector function that retrieves the terrains data from the state.
 * It takes the RootState as input and returns the terrain object list.
 */
export const selectTerrains = (state: RootState): TerrainObjectList =>
  state?.[terrainsSlice.name].data as TerrainObjectList;

/**
 * selectTerrainErrors is a selector function that retrieves the terrain errors from the state.
 * It takes the RootState as input and returns the array of error strings or null if there are no errors.
 */
export const selectTerrainErrors = (state: RootState): string[] | null =>
  state?.[terrainsSlice.name].errors;

export default terrainsSlice;
