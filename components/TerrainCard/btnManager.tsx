import React from 'react';
import { GuardianObject } from '@/libs/types';
import MoneySymbol from '@/components/MoneySymbol';
import BaseButton from '@/components/base/Button';

type Props = {
  guardian: GuardianObject;
  onHireManager?: () => void;
};

function BtnManager({ guardian, onHireManager = () => {} }: Props) {
  return (
    <BaseButton
      variant="manager"
      onClick={onHireManager}
      aria-label="Hire manager"
      fullWidth
    >
      <div className="flex w-full items-center justify-between px-2">
        <div className="mt-1 font-bold">+Manager</div>

        <div className="text-xs flex items-center justify-center">
          <span className="mr-1">{MoneySymbol}</span>
          <span>
            {guardian.cost.toFixed(2)}e{guardian.costNotation}
          </span>
        </div>
      </div>
    </BaseButton>
  );
}

BtnManager.defaultProps = {
  onHireManager: () => {},
};

export default BtnManager;
