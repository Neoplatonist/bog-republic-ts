import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import type { RootState } from '..';

export const TestFetch = createAsyncThunk(
  'TestFetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const d = await response.json();
      return d;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  data: [] as any[],
};

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    update: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.data = payload;
    },
  },
  extraReducers: {
    // https://github.com/kirill-konshin/next-redux-wrapper#how-it-works
    // This allows for rehydration of the store from the server
    // while on the client side.
    // This is needed for SSR and SSG.
    [HYDRATE]: (state: RootState, action) => {
      const stateDiff = diff(state, action.payload);
      const isDiff = stateDiff?.test?.data;

      return {
        ...state,
        ...action.payload,

        test: isDiff ? action.payload.test : state.test,
      };
    },
  },
});

export const { update } = slice.actions;
export const selectTest = (state: RootState) => state?.[slice.name].data;

export default slice;
