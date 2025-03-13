import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  Action,
  configureStore,
  ThunkDispatch,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rememberEnhancer, rememberReducer } from 'redux-remember';

// import reducers
import terrainsReducer from './terrains';
import userReducer from './user';
import userTerrainsReducer from './userTerrains';
import clientApi from './clientApi';

const isDev = process.env.NODE_ENV === 'development';
const rememberedKeys = [clientApi.reducerPath];

export const store = configureStore({
  reducer: rememberReducer({
    // Reducers
    [userReducer.name]: userReducer.reducer,
    [terrainsReducer.name]: terrainsReducer.reducer,
    [userTerrainsReducer.name]: userTerrainsReducer.reducer,

    // Query and Mutations
    [clientApi.reducerPath]: clientApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware),
  devTools: isDev,
  enhancers: (defaultEnhancers) => {
    // Only add the enhancer in browser environments
    if (typeof window !== 'undefined') {
      const enhancer = rememberEnhancer(window.localStorage, rememberedKeys, {
        prefix: 'app-state-',
      });

      return defaultEnhancers().concat(enhancer as StoreEnhancer);
    }

    return defaultEnhancers();
  },
});

setupListeners(store.dispatch);

// Selector with type
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Dispatch with type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// ThunkDispatch with Type
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;
export const useAppThunkDispatch: () => ReturnType<
  typeof useDispatch<AppThunkDispatch>
> = useDispatch;
