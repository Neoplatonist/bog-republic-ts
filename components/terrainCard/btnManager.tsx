import React from "react";
import { GuardianObject } from "@/libs/types";
import MoneySymbol from "../moneySymbol";

type Props = {
  guardian: GuardianObject;
};

function BtnGrow({ guardian }: Props) {
  return (
    <button type='button'
      className='flex flex-col basis-1/3-gap-1 btn btn-primary shadow-custom'
      onClick={() => { }}
    >
      <div className='text-xs'>
        {MoneySymbol}{guardian.cost.toFixed(2)}e{guardian.costNotation}
      </div>

      <div className='mt-2'>
        +Manager
      </div>
    </button>
  );
}

export default BtnGrow;
