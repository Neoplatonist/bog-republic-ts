import React from 'react';
import BaseButton from '@/components/base/Button';

type Props = {
  isLocked?: boolean;
  onHarvest?: () => void;
};

function BtnHarvest({ isLocked = false, onHarvest = () => {} }: Props) {
  return (
    <BaseButton
      variant="harvest"
      disabled={isLocked}
      onClick={onHarvest}
      aria-label="Harvest resources"
      className="h-[56px]"
      fullWidth
    >
      <div className="font-bold">Harvest</div>
    </BaseButton>
  );
}

BtnHarvest.defaultProps = {
  isLocked: false,
  onHarvest: () => {},
};

export default BtnHarvest;
