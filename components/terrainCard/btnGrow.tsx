import React from "react";
import MoneySymbol from "../moneySymbol";

type Props = {
  baseCost: number;
  baseCostNotation: number;
};

function BtnGrow({ baseCost, baseCostNotation }: Props) {
  return (
    <button type='button'
      className='flex flex-col basis-1/3-gap-1 btn btn-primary shadow-custom'
      onClick={() => { }}
    >
      <div className='text-xs'>
        {MoneySymbol}{baseCost.toFixed(2)}e{baseCostNotation}
      </div>

      <div className='mt-2'>
        Grow
      </div>
    </button>
  );
}

export default BtnGrow;
