import React from 'react';
import { TerrainObject } from '@/libs/types';
import Link from 'next/link';

import ProfileImage from './profileImage';
import Stats from './stats';
import BtnGrow from './btnGrow';
import BtnHarvest from './btnHarvest';
import BtnManager from './btnManager';

type Props = TerrainObject;

function TerrainCard({
  id,
  name,
  income,
  incomeNotation,
  waitTime,
  baseCost,
  baseCostNotation,
  guardian
}: Props) {
  return (
    <li key={id} className='flex flex-col m-4 rounded-xl p-4 bg-accent shadow-custom'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        backgroundColor: '#A98467',
        background: 'url("/images/old-wall.png"), radial-gradient(circle, rgba(169,132,103,1) 75%, rgba(108,88,76,1) 100%)',
      }}>

      {/* Terrain Name + Link */}
      <div className='w-[160px] mx-auto px-3 btn-outline py-1 bg-base-200 note rounded-note text-sm font-semibold text-center'
        style={{
          boxShadow: '0 4px 4px -2px rgb(0 0 0 / 0.07), 0 2px 0px -1px rgb(0 0 0 / 0.06)'
        }}>
        <Link href={`#${id}`}>
          {`${name} x${1}`}
        </Link>
      </div>

      {/* Terrain Main Contents */}
      < div className='w-full mt-5 flex items-center justify-between' >

        {/* Terrain Profile Image */}
        <ProfileImage terrainName={name} />

        {/* Terrain Stats */}
        <Stats
          terrainIncome={income}
          terrainIncomeNotation={incomeNotation}
          terrainWaitTime={waitTime}
        />
      </div>

      {/* Three main action buttons */}
      <div className='mt-8 btn-group gap-1'>
        <BtnGrow
          baseCost={baseCost}
          baseCostNotation={baseCostNotation}
        />

        <BtnHarvest />

        <BtnManager guardian={guardian} />
      </div>
    </li>
  );
}

export default TerrainCard;;
