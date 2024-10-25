/* eslint-disable no-param-reassign */
import {
  Action,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import { z } from 'zod';
import type { RootState } from '@/libs/redux';
import {
  MyceliumObject,
  UserTerrainsObject,
  UserTerrainsObjectList,
  UserTerrainsObjectListSchema,
} from '@/libs/types';
import UserTerrainsApi from '@/libs/redux/userTerrains/api';
import { GetIndexById } from '@/libs/redux/userTerrains/utils';

/**
 * Error message for when fetching UserTerrainsApi data fails.
 */
const FETCH_USER_TERRAINS_FAILED = 'Error fetching UserTerrainsApi data';

/**
 * Schema for the UserTerrainState object.
 */
const UserTerrainStateSchema = z.object({
  data: UserTerrainsObjectListSchema,
  errors: z.array(z.string()).nullable(),
});

/**
 * Type representing the UserTerrainState.
 */
export type UserTerrainState = z.infer<typeof UserTerrainStateSchema>;

type PayloadUserTerrainMycelium = {
  terrainId: number;
  mycelium: number;
  myceliumNotation: number;
};

/**
 * Initial state for the userTerrainsSlice.
 */
const initialState = {
  data: [],
  errors: null,
} as UserTerrainState;

/**
 * userTerrainsSlice represents a Redux slice for managing user terrains.
 */
const userTerrainsSlice = createSlice({
  name: 'userTerrains',
  initialState,
  reducers: {
    /**
     * Action for locking a single terrain harvest.
     */
    lockHarvest: (state, action: PayloadAction<number>) => {
      const index = GetIndexById(state.data, action.payload);
      state.data[index].isContributionLocked = true;
    },
    /**
     * Action for unlocking a single terrain harvest.
     */
    unlockHarvest: (state, action: PayloadAction<number>) => {
      const index = GetIndexById(state.data, action.payload);
      state.data[index].isContributionLocked = false;
    },
    /**
     * Action for incrementing the number of a single terrain type owned.
     */
    incrementNumberOwned: (state, action: PayloadAction<number>) => {
      const index = GetIndexById(state.data, action.payload);
      state.data[index].numberOwned += 1;
    },
    /**
     * Action for setting the next cost of a single terrain type.
     */
    setNextCost: (state, action: PayloadAction<PayloadUserTerrainMycelium>) => {
      const index = GetIndexById(state.data, action.payload.terrainId);
      state.data[index].nextCost = action.payload.mycelium;
      state.data[index].nextCostNotation = action.payload.myceliumNotation;
    },
    /**
     * Action for setting the current income of a single terrain type.
     */
    setCurrentIncome: (
      state,
      action: PayloadAction<PayloadUserTerrainMycelium>
    ) => {
      const index = GetIndexById(state.data, action.payload.terrainId);
      state.data[index].currentIncome = action.payload.mycelium;
      state.data[index].currentIncomeNotation = action.payload.myceliumNotation;
    },
    /**
     * Action for adding a single terrain type to the user's list of terrains.
     */
    addUserTerrain: (state, action: PayloadAction<UserTerrainsObject>) => {
      state.data.push(action.payload);
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
        const wasBumpedOnClient = stateDiff?.userTerrains?.data;

        // keep existing state or use hydrated state
        const data = wasBumpedOnClient
          ? state.userTerrains
          : action.payload.userTerrains;

        // Update state with new data
        return {
          ...state.userTerrains,
          ...action.payload.userTerrains,
          // keep existing state or use hydrated
          ...data,
        };
      })
      .addMatcher(
        UserTerrainsApi.endpoints.getUserTerrains.matchFulfilled,
        (state, { payload }) => {
          // Check if query response matches schema
          const userTerrains = UserTerrainsObjectListSchema.safeParse(payload);

          // Handle schema check errors
          if (!userTerrains.success) {
            state.errors = [
              FETCH_USER_TERRAINS_FAILED,
              'UserTerrainsApi -> getUserTerrains typecheck failed',
              ...userTerrains.error.issues.map(
                (issue) => `${issue.path[0]}: ${issue.message}`
              ),
            ];
            return;
          }

          // Handle schema check success; update state
          state.data = [...state.data, ...userTerrains.data];
          state.errors = null;
        }
      )
      .addMatcher(
        UserTerrainsApi.endpoints.getUserTerrains.matchRejected,
        (state) => {
          state.errors = [
            FETCH_USER_TERRAINS_FAILED,
            'UserTerrainsApi -> getUserTerrains rejected',
          ];
        }
      );
  },
});

/**
 * Action creators generated for each case reducer function.
 */
export const {
  incrementNumberOwned,
  lockHarvest,
  unlockHarvest,
  setNextCost,
  setCurrentIncome,
  addUserTerrain,
} = userTerrainsSlice.actions;

/**
 * Selects the UserTerrainsObjectList from the state.
 *
 * @param state - The root state.
 * @returns The UserTerrainsObjectList.
 */
export const selectAllUserTerrains = (state: RootState) =>
  state?.[userTerrainsSlice.name].data as UserTerrainsObjectList;

/**
 * Selects a UserTerrainsObject from the state by id.
 *
 * @param id - The id of the UserTerrainsObject to select.
 * @param state - The root state.
 * @returns The UserTerrainsObject.
 */
export const selectUserTerrain =
  (terrainId: number) =>
  (state: RootState): UserTerrainsObject =>
    state?.[userTerrainsSlice.name].data[
      GetIndexById(state?.[userTerrainsSlice.name].data, terrainId)
    ];

export default userTerrainsSlice;
