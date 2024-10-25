import React, { MouseEvent } from "react";
import { MyceliumObject } from "@/libs/types";
import { useAppDispatch, useTypedSelector } from "@/libs/redux";
import HarvestTerrain from "@/libs/redux/userTerrains/harvestTerrain";
import throttle from 'lodash/throttle';
import { selectTimer } from "@/libs/redux/timers";

type BtnHarvestProps = {
  terrainId: number;
  income: MyceliumObject;
  waitTime: number;
};

function BtnHarvest({ terrainId, income, waitTime }: BtnHarvestProps) {
  const dispatch = useAppDispatch();
  const timer = useTypedSelector(selectTimer(terrainId));

  const handleHarvest = throttle((_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    _event.currentTarget.blur();
    dispatch(HarvestTerrain({
      terrainId,
      income,
      waitTime,
    }));
  }, waitTime);

  return (
    <button type='button'
      className='basis-1/3-gap-1 btn btn-info shadow-custom text-xl hover:bg-yellow-500'
      onClick={handleHarvest}
      disabled={timer?.isLocked}
    >
      Harvest
    </button>
  );
}

export default BtnHarvest;
