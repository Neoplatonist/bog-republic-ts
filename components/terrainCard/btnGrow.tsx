import React, { MouseEvent } from "react";
import { MyceliumObject } from "@/libs/types";
import { useAppDispatch, useTypedSelector } from "@/libs/redux";
// import HarvestTerrain from "@/libs/redux/userTerrains/harvestTerrain";
import { selectUserMycelium } from "@/libs/redux/user";
import { GreaterThanOrEqualTo } from "@/libs/myceliumMath";
import GrowTerrain from "@/libs/redux/userTerrains/growTerrain";
import MoneySymbol from "../moneySymbol";

type BtnGrowProps = {
  terrainId: number;
  cost: MyceliumObject;
  waitTime: number;
  income: MyceliumObject;
  coefficient: number;
  numberOwned: number;
};

function BtnGrow({
  terrainId,
  cost,
  waitTime,
  income,
  coefficient,
  numberOwned,
}: BtnGrowProps) {
  const dispatch = useAppDispatch();
  const userMycelium = useTypedSelector(selectUserMycelium);
  const canGrow = GreaterThanOrEqualTo(userMycelium, cost);

  const handleBlur = (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    _event.currentTarget.blur();

    dispatch(GrowTerrain({
      terrainId,
      cost,
      waitTime,
      income,
      coefficient,
      numberOwned,
    }));
  };

  return (
    <button type='button'
      className='flex flex-col basis-1/3-gap-1 btn btn-primary shadow-custom disabled:!bg-primary disabled:opacity-50'
      onClick={handleBlur}
      disabled={!canGrow}
    >
      <div className='text-xs'>
        {MoneySymbol}{cost.mycelium.toFixed(2)}e{cost.myceliumNotation}
      </div>

      <div className='mt-2'>
        Grow
      </div>
    </button>
  );
}

export default BtnGrow;
