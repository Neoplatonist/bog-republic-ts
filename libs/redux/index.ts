import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  configureStore,
  ConfigureStoreOptions,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import type { Store } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';

// import reducers
import testReducer from './test';

const isDev = process.env.NODE_ENV === 'development';

export const createStore: () => Store = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [testReducer.name]: testReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: isDev,
    ...options,
  });

// create store to make the
// dispatch, thunk dispatch, and useSelector types avaliable
const store = createStore();

// create a makeStore function for next-redux-wrapper
// eslint-disable-next-line no-unused-vars
export const makeStore = (context: Context) => store;

// assembled next-redux-wrapper
export const wrapper = createWrapper(makeStore, {
  debug: isDev,
});

// Selector with type
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<any> = useSelector;

// Dispatch with type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// ThunkDispatch with Type
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppThunkDispatch: () => AppThunkDispatch = useDispatch;
