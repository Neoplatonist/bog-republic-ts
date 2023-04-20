import React from "react";
import MoneySymbol from "@/components/moneySymbol";
import FormatMsToTime from "@/libs/timer";

type Props = {
  terrainIncome: number;
  terrainIncomeNotation: number;
  terrainWaitTime: number;
};

function Stats({ terrainIncome, terrainIncomeNotation, terrainWaitTime }: Props) {
  console.log(terrainWaitTime);
  return (
    <>
      <div className='w-full flex-grow p-2 text-base-100 text-3xl font-semibold text-center'>
        <div>
          {MoneySymbol} {`${terrainIncome.toFixed(2)}e${terrainIncomeNotation}`}
        </div>

        <div>
          {FormatMsToTime(terrainWaitTime)}
        </div>
      </div>

      <div className='w-[70px] flex flex-col justify-center items-center'
        style={{
          filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
        }}>
        <button type='button' className='w-[75px] btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-custom'>Boost</button>
        <button type='button' className='w-[75px] mt-2 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg shadow-custom'>Upgrade</button>
      </div>
    </>
  );
}

export default Stats;
