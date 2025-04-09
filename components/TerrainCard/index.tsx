import React from 'react';
import Link from 'next/link';

import { CombinedTerrain } from '@/libs/types';
import ProfileImage from './profileImage';
import Stats from './stats';
import BtnGrow from './btnGrow';
import BtnHarvest from './btnHarvest';
import BtnManager from './btnManager';

function TerrainCard({
  id,
  name,
  income,
  incomeNotation,
  waitTime,
  baseCost,
  baseCostNotation,
  guardian,
  userTerrain,
}: CombinedTerrain) {
  return (
    <li
      key={id}
      className="flex flex-col m-4 rounded-xl p-4 bg-accent shadow-custom"
      style={{
        filter:
          'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        backgroundColor: '#A98467',
        background:
          'url("/images/old-wall.png"), radial-gradient(circle, rgba(169,132,103,1) 75%, rgba(108,88,76,1) 100%)',
      }}
    >
      {/* Terrain Name + Link */}
      <div
        className="w-[160px] mx-auto px-3 btn-outline py-1 bg-base-200 note rounded-note text-sm font-semibold text-center"
        style={{
          boxShadow:
            '0 4px 4px -2px rgb(0 0 0 / 0.07), 0 2px 0px -1px rgb(0 0 0 / 0.06)',
        }}
      >
        <Link href={`#${id}`}>{`${name} x${1}`}</Link>
      </div>

      {/* Terrain Main Contents */}
      <div className="w-full mt-5 flex items-center justify-between">
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
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="order-2 sm:order-1">
          <BtnGrow baseCost={baseCost} baseCostNotation={baseCostNotation} />
        </div>

        <div className="order-3 sm:order-2">
          <BtnHarvest isLocked={userTerrain.isContributionLocked} />
        </div>

        <div className="order-1 sm:order-3">
          <BtnManager guardian={guardian} />
        </div>
      </div>

      {/* Locked indicator */}
      {userTerrain.isContributionLocked && (
        <div className="mt-2 text-center text-amber-100 text-sm bg-amber-900/30 rounded-md py-1">
          <span className="inline-block mr-1">🔒</span>
          Contributions locked
        </div>
      )}
    </li>
  );
}

export default TerrainCard;
