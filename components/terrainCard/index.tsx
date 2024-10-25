import React from 'react';
import { TerrainObject, UserTerrainsObject } from '@/libs/types';
import Link from 'next/link';
import ProfileImage from './profileImage';
import Stats from './stats';
import BtnGrow from './btnGrow';
import BtnHarvest from './btnHarvest';
import BtnManager from './btnManager';

interface TerrainCardProps {
  terrain: TerrainObject;
  userTerrains: UserTerrainsObject;
}

// eslint-disable-next-line no-unused-vars
function TerrainCard({ terrain, userTerrains }: TerrainCardProps) {
  const {
    id,
    name,
    imageUrl,
    // income,
    // incomeNotation,
    waitTime,
    // baseCost,
    // baseCostNotation,
    guardian
  } = terrain;

  return (
    <li key={id} className='flex flex-col m-4 rounded-xl p-4 bg-accent shadow-custom'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        backgroundColor: '#A98467',
        background: 'url("/images/old-wall.png"), radial-gradient(circle, rgba(169,132,103,1) 75%, rgba(108,88,76,1) 100%)',
      }}>

      <div className='flex justify-center items-center'>
        <div className='w-[70px] '
          style={{
            filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
          }}>
          <button type='button' className='w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-custom text-base-100'>Boost</button>
        </div>

        {/* Terrain Name + Link */}
        <div className='w-[160px] mx-auto px-3 btn-outline py-1 bg-base-200 note rounded-note text-sm font-semibold text-center'
          style={{
            boxShadow: '0 4px 4px -2px rgb(0 0 0 / 0.07), 0 2px 0px -1px rgb(0 0 0 / 0.06)'
          }}>
          <Link href={`#${id}`}>
            {`${name} x${userTerrains.numberOwned}`}
          </Link>
        </div>

        <div className='w-[70px] flex flex-col justify-center items-center'
          style={{
            filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
          }}>
          <button
            type='button'
            className='w-[75px] btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-custom text-base-100'
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Terrain Main Contents */}
      <div className='w-full mt-5 flex items-center justify-around'>

        {/* Terrain Profile Image */}
        <ProfileImage terrainName={name} terrainImg={imageUrl} />

        {/* Terrain Stats */}
        <Stats
          terrainId={id}
          terrainIncome={userTerrains.currentIncome}
          terrainIncomeNotation={userTerrains.currentIncomeNotation}
          terrainWaitTime={waitTime}
        />
      </div>

      {/* Three main action buttons */}
      <div className='mt-8 btn-group gap-1'>
        <BtnGrow
          terrainId={id}
          cost={{
            mycelium: userTerrains.nextCost,
            myceliumNotation: userTerrains.nextCostNotation,
          }}
          income={{
            mycelium: userTerrains.currentIncome,
            myceliumNotation: userTerrains.currentIncomeNotation,
          }}
          coefficient={terrain.coefficient}
          numberOwned={userTerrains.numberOwned}
          waitTime={waitTime}
        />

        <BtnHarvest
          terrainId={id}
          income={{
            mycelium: userTerrains.currentIncome,
            myceliumNotation: userTerrains.currentIncomeNotation,
          }}
          waitTime={waitTime}
        />

        <BtnManager
          guardian={guardian}
        />
      </div>
    </li>
  );
}

export default TerrainCard;;
