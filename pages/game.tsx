import React from 'react';
import { NextPageWithAuth } from '@/libs/types';
import axios from '@/libs/axios';
import styles from '@/styles/Game.module.css';

const Game: NextPageWithAuth = ({
  terrains,
  error,
}: {
  terrains: any;
  error: any;
}) => {
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* User Stats Card */}
      <div className={styles.userStats}>
        <p>User: </p>
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
