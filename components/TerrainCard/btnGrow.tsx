import React from 'react';
import MoneySymbol from '@/components/MoneySymbol';
import BaseButton from '@/components/base/Button';

type Props = {
  baseCost: number;
  baseCostNotation: number;
  onGrow?: () => void;
};

function BtnGrow({ baseCost, baseCostNotation, onGrow = () => {} }: Props) {
  return (
    <BaseButton
      variant="primary"
      onClick={onGrow}
      aria-label="Grow terrain"
      fullWidth
    >
      <div className="flex w-full items-center justify-between px-2">
        <div className="font-bold">Grow</div>

        <div className="flex items-center text-xs">
          <span className="mr-1">{MoneySymbol}</span>
          <span>
            {baseCost.toFixed(2)}e{baseCostNotation}
          </span>
        </div>
      </div>
    </BaseButton>
  );
}

BtnGrow.defaultProps = {
  onGrow: () => {},
};

export default BtnGrow;
