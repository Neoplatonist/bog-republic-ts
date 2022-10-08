/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import type { RootState } from '@/libs/redux';
import { z } from 'zod';
import { UserObjectSchema } from '@/libs/types';

const UserStateSchema = z.object({
  data: UserObjectSchema,
  errors: z.array(z.string()).nullable(),
});

export type UserState = z.infer<typeof UserStateSchema>;

const initialState = {
  data: {},
  errors: null,
} as UserState;

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
    // This allows for rehydration of the store from the server
    // while on the client side.
    // This is needed for SSR and SSG.
    [HYDRATE]: (state: RootState, action: PayloadAction<any>) => {
      const stateDiff = diff(state, action.payload);
      const wasBumpedOnClient = stateDiff?.user?.data;

      // keep existing state or use hydrated state
      const data = wasBumpedOnClient ? state.user : action.payload.user;

      const newState = {
        ...state.user,
        ...action.payload.user,
        // keep existing state or use hydrated
        ...data,
      };

      return newState;
    },
  },
});

export default slice;
