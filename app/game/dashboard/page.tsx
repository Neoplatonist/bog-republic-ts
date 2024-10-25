'use client';

import React, { MouseEvent } from 'react';
import { useAppDispatch, useTypedSelector } from '@/libs/redux';
import { selectTerrains } from '@/libs/redux/terrains';
import { selectAllUserTerrains } from '@/libs/redux/userTerrains';
// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from '@/components/errorFallback';
import UserCard from '@/components/userCard';
import TerrainCard from '@/components/terrainCard';
// import { selectTimer } from '@/libs/redux/timers';
import MoneySymbol from '@/components/moneySymbol';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { selectUser, selectUserMycelium } from '@/libs/redux/user';
import { selectUserMycelium } from '@/libs/redux/user';
import { GreaterThanOrEqualTo } from '@/libs/myceliumMath';
import cx from '@/libs/cx';
import BuyTerrain from '@/libs/redux/userTerrains/buyTerrain';
import { TerrainObject } from '@/libs/types';

function DashboardPage() {
  const dispatch = useAppDispatch();

  // Redux Selectors
  const userMycelium = useTypedSelector(selectUserMycelium);
  const terrains = useTypedSelector(selectTerrains);
  const userTerrains = useTypedSelector(selectAllUserTerrains);
  let filteredTerrains = terrains;
  let nextTerrain: TerrainObject | null = null;
  let canBuyNextTerrain = false;

  const terrainsAreEqual = terrains?.length === userTerrains?.length;
  if (!terrainsAreEqual && terrains && userTerrains) {
    filteredTerrains = terrains.filter((terrain) =>
      userTerrains.some((userTerrain) => userTerrain.id === terrain.id)
    );

    nextTerrain = terrains[filteredTerrains.length];
    canBuyNextTerrain = GreaterThanOrEqualTo(
      userMycelium,
      {
        mycelium: nextTerrain.baseCost,
        myceliumNotation: nextTerrain.baseCostNotation
      }
    );
  };

  const handleBuyNextTerrain = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
    dispatch(BuyTerrain({ terrainId: nextTerrain?.id || 99 }));
  };

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <>

      {/* All User Information */}
      <UserCard />

      {/* Terrain Cards */}
      <ul className='mx-0 my-8 p-0 list-none'>
        {
          filteredTerrains.map((terrain, index) =>
            TerrainCard({ terrain, userTerrains: userTerrains[index] })
          )
        }

        {!terrainsAreEqual && (
          <li className='flex justify-center items-center m-4 rounded-xl p-4 bg-accent text-xl font-semibold shadow-custom'
            style={{
              filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
              backgroundColor: '#A98467',
              background: 'url("/images/old-wall.png"), radial-gradient(circle, rgba(169,132,103,1) 75%, rgba(108,88,76,1) 100%)',
            }}>
            <button
              type='button'
              className='h-full w-4/5 p-4 flex flex-col justify-center items-center gap-2 btn btn-primary shadow-custom hover:scale-105 transition-all duration-200 ease-in-out disabled:bg-primary'
              onClick={handleBuyNextTerrain}
              disabled={!canBuyNextTerrain}
            >
              <FontAwesomeIcon icon={faPlus} className={cx('w-4 h-4 mb-2 border border-1 border-slate-900 p-1 rounded-full', canBuyNextTerrain ? '' : 'border-0')} />

              <div className='text-lg lowercase'>
                {MoneySymbol} {`${nextTerrain?.baseCost}e${nextTerrain?.baseCostNotation}`}
              </div>

              Propagate Next Terrain
            </button>
          </li>
        )}
      </ul>

    {/* </ErrorBoundary> */}
    </>
  );
};

export default DashboardPage;
