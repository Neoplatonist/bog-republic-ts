import React from "react";
import MoneySymbol from "@/components/moneySymbol";
import TerrainTimer from "./timer";

type StatsProps = {
  terrainId: number;
  terrainIncome: number;
  terrainIncomeNotation: number;
  terrainWaitTime: number;
};

function Stats({
  terrainId,
  terrainIncome,
  terrainIncomeNotation,
  terrainWaitTime,
}: StatsProps) {
  return (
    <div className='w-2/3 h-[100px] flex items-center bg-neutral border border-success shadow-custom rounded-r-3xl'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
      }}
    >
      <div className='w-full flex-grow p-2 text-base-100 text-3xl font-semibold text-center'>
        <div>
          {MoneySymbol} {`${terrainIncome.toFixed(2)}e${terrainIncomeNotation}`}
        </div>

        <div>
          <TerrainTimer
            terrainId={terrainId}
            waitTime={terrainWaitTime}
          />
        </div>
      </div>
    </div>
  );
}

export default Stats;
