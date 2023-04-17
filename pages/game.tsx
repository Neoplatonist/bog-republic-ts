import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NextPageWithAuth } from '@/libs/types';
import { storeWithWrapper, useTypedSelector } from '@/libs/redux';
import {
  selectTerrainErrors,
  selectTerrains,
  setTerrainError,
  setTerrains,
} from '@/libs/redux/terrains';
import TerrainsApi from '@/libs/redux/terrains/api';
import GameLayout from '@/layout/game';
import TerrainCard from '@/components/terrainCard';
import UserCard from '@/components/userCard';
import ErrorFallback from '@/components/errorFallback';

const Game: NextPageWithAuth = () => {
  // Redux Selectors
  const terrains = useTypedSelector(selectTerrains);
  const terrainErrors = useTypedSelector(selectTerrainErrors);

  if (terrainErrors?.length) {
    terrainErrors?.map(
      error => {
        throw new Error(error);
      }
    );
  }

  return (
    <GameLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>

        {/* All User Information */}
        <UserCard />

        {/* Terrain Cards */}
        <ul className='mx-0 my-8 p-0 list-none'>
          {terrains?.map(TerrainCard)}
        </ul>

      </ErrorBoundary>
    </GameLayout >
  );
};


// Static Site Generation (SSG) with data fetching
// Getting the terrains from the backend
export const getStaticProps = storeWithWrapper.getStaticProps(store => async () => {
  // Fetch the data with rtk-query
  await store.dispatch(TerrainsApi.endpoints.getTerrains.initiate(''));

  // Grab the data or error data from the store
  const { data, isError, error } = TerrainsApi.endpoints.getTerrains.select('')(store.getState());

  if (isError) {
    // This is a fix for the error type being incorrect from getTerrains.select()
    type Error = {
      status: string;
      error: string;
    };

    // Cast the TerrainsApi error to the Error type
    const e = error as Error;
    store.dispatch(setTerrainError(null)); // clears the error since it's already been handled
    store.dispatch(setTerrainError(e.error || 'Error fetching Terrains from server'));
  }

  if (data && !isError) {
    store.dispatch(setTerrains(data));
  }

  return {
    props: {}
  };
});

// This enforces that the page is only accessible by
// logged in users via the AuthGuard wrapper component.
Game.requireAuth = true;

export default Game;
