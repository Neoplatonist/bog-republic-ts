import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import { z } from 'zod';
import type { RootState } from '@/libs/redux';
import { UserTerrainsObject, UserTerrainsObjectListSchema } from '@/libs/types';
import userTerrainsApi from '@/libs/redux/userTerrains/api';
import { GetIndexById } from '@/libs/redux/userTerrains/utils';

const UserTerrainStateSchema = z.object({
  data: UserTerrainsObjectListSchema,
  errors: z.array(z.string()).nullable(),
});

export type UserTerrainState = z.infer<typeof UserTerrainStateSchema>;

const initialState = {
  data: [],
  errors: null,
} as UserTerrainState;

const slice = createSlice({
  name: 'userTerrains',
  initialState,
  reducers: {
    lockHarvest: (state, { payload }) => {
      const index = GetIndexById(state.data, payload);
      // eslint-disable-next-line no-param-reassign
      state.data[index].isContributionLocked = true;
    },
    unlockHarvest: (state, { payload }) => {
      const index = GetIndexById(state.data, payload);
      // eslint-disable-next-line no-param-reassign
      state.data[index].isContributionLocked = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userTerrainsApi.endpoints.getUserTerrains.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        data: payload.map((terrain: UserTerrainsObject) => ({
          ...terrain,
          isContributionLocked: false,
        }))
      })
    );

    // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
    // This allows for rehydration of the store from the server
    // while on the client side.
    // This is needed for SSR and SSG.
    return {
      [HYDRATE]: (state: RootState, action: PayloadAction<any>) => {
        const stateDiff = diff(state, action.payload);
        const wasBumpedOnClient = stateDiff?.userTerrains?.data;

        // keep existing state or use hydrated state
        const data = wasBumpedOnClient ? state.userTerrains : action.payload.userTerrains;

        const newState = {
          ...state.userTerrains,
          ...action.payload.userTerrains,
          // keep existing state or use hydrated
          ...data,
        };

        return newState;
      },
    };
  },
});

// Action creators are generated for each case reducer function
export const { lockHarvest, unlockHarvest } = slice.actions;

export default slice;
