import React, { MouseEvent } from 'react';
import { NextPageWithAuth } from '@/libs/types';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import axios from '@/libs/axios';
import styles from '@/styles/Game.module.css';

const Game: NextPageWithAuth = ({
  terrains,
  error,
}: {
  terrains: any;
  error: any;
}) => {
  const router = useRouter();
  if (error) return <p>Error: {error}</p>;

  // Logs the user out
  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut(getAuth())
      .then(() => router.push('/')); // Redirects to the home page
  };

  return (
    <div>
      {/* User Stats Card */}
      <div className={styles.userStats}>
        <p>User: </p>

        <button type='button' onClick={handleLogout}>Logout</button>
      </div>

      {/* Terrain Cards */}
      <ul className={styles.terrainCard__container}>
        {terrains.map((terrain: {
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

export async function getStaticProps() {
  try {
    const result = await axios.get('/terrain');
    const data = await result.data;

    return {
      props: {
        terrains: data,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        terrains: [],
        error: error?.message
      },
    };
  }
}

// This enforces that the page is only accessible by
// logged in users via the AuthGuard wrapper component.
Game.requireAuth = true;

export default Game;
