import React, { MouseEvent } from "react";
// import { GuardianObject, MyceliumObject } from "@/libs/types";
import { GuardianObject } from "@/libs/types";
import { useTypedSelector } from "@/libs/redux";
import { selectUserMycelium } from "@/libs/redux/user";
import { GreaterThanOrEqualTo } from "@/libs/myceliumMath";
import MoneySymbol from "../moneySymbol";

type BtnManagerProps = {
  guardian: GuardianObject;
};

function BtnManager({ guardian }: BtnManagerProps) {
  const userMycelium = useTypedSelector(selectUserMycelium);
  const canManager = GreaterThanOrEqualTo(
    userMycelium,
    {
      mycelium: guardian.cost,
      myceliumNotation: guardian.costNotation,
    }
  );

  const handleBlur = (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    _event.currentTarget.blur();
    alert('you clicked Manager');
  };

  return (
    <button type='button'
      className='flex flex-col basis-1/3-gap-1 btn btn-primary shadow-custom disabled:!bg-primary disabled:opacity-50'
      onClick={handleBlur}
      disabled={!canManager}
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

export default BtnManager;
