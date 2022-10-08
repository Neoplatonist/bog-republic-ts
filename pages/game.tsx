import React, { MouseEvent } from 'react';
import { NextPageWithAuth } from '@/libs/types';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import {
  storeWithWrapper,
  useAppThunkDispatch,
  useTypedSelector
} from '@/libs/redux';
import {
  selectTerrainErrors,
  selectTerrains,
  setTerrainError,
  setTerrains
} from '@/libs/redux/terrains';
import { addToMycelium, subtractFromMycelium, selectUserMycelium } from '@/libs/redux/user';
import TerrainsApi from '@/libs/redux/terrains/api';
import { useGetUserQuery } from '@/libs/redux/user/api';
import styles from '@/styles/Game.module.css';

const Game: NextPageWithAuth = () => {
  // NextJS
  const router = useRouter();

  // Selectors
  const terrains = useTypedSelector(selectTerrains);
  const terrainErrors = useTypedSelector(selectTerrainErrors);

  // Dispatch
  const dispatch = useAppThunkDispatch();
  const { mycelium, myceliumNotation } = useTypedSelector(selectUserMycelium);

  // Get user data as soon as they log in
  const { data: user } = useGetUserQuery('');

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

  // User Actions -------------------------------------------------------------
  // Logs the user out
  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut(getAuth())
      .then(() => router.push('/')); // Redirects to the home page
  };

  // Adds Mycelium to the user's account
  const handleAddMycelium = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addToMycelium({
      mycelium: 10,
      myceliumNotation: 0,
    }));
  };

  // Subtracts Mycelium from the user's account
  const handleSubtractMycelium = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(subtractFromMycelium({
      mycelium: 10,
      myceliumNotation: 0,
    }));
  };

  return (
    <div>
      {/* User Stats Card */}
      <div className={styles.userStats}>
        <p>User: {user && user.username}</p>

        <button type='button' onClick={handleLogout}>Logout</button>
      </div>

      <div>
        <h2>Mycelium: {mycelium} e{myceliumNotation}</h2>
        <button type="button" onClick={handleAddMycelium}>Add Mycelium</button>
        <button type="button" onClick={handleSubtractMycelium}>Subtract Mycelium</button>
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
