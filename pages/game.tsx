import React, { MouseEvent } from 'react';
import { NextPageWithAuth } from '@/libs/types';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import {
  storeWithWrapper,
  useTypedSelector
} from '@/libs/redux';
import {
  selectTerrainErrors,
  selectTerrains,
  setTerrainError,
  setTerrains
} from '@/libs/redux/terrains';
import TerrainsApi from '@/libs/redux/terrains/api';
import styles from '@/styles/Game.module.css';

const Game: NextPageWithAuth = () => {
  const router = useRouter();
  const terrains = useTypedSelector(selectTerrains);
  const terrainErrors = useTypedSelector(selectTerrainErrors);

  // Logs the user out
  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut(getAuth())
      .then(() => router.push('/')); // Redirects to the home page
  };

  /**
   * TODO: Add proper error/warning to the UI.
   */
  if (terrainErrors?.length) {
    return (
      <div>
        <h1>Errors</h1>
        <ul>
          {terrainErrors?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {/* User Stats Card */}
      <div className={styles.userStats}>
        <p>User: Anonymous</p>

        <button type='button' onClick={handleLogout}>Logout</button>
      </div>

      {/* Terrain Cards */}
      <ul className={styles.terrainCard__container}>
        {terrains?.map((terrain: {
          name: string; id: React.Key | null | undefined;
        }) => (
          <li key={terrain.id} className={styles.terrainCard}>
            Name: {terrain.name}
          </li>
        ))}
      </ul>
    </div >
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
