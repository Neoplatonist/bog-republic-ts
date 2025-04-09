import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles for all buttons
  'relative flex items-center justify-center transition-all duration-200 shadow-custom font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[36px]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white',
        secondary: 'bg-blue-600 hover:bg-blue-700 text-white',
        harvest: 'bg-amber-500 hover:bg-amber-600 text-white',
        manager: 'bg-purple-600 hover:bg-purple-700 text-white',
      },
      size: {
        default: 'px-4 py-2 text-sm',
        sm: 'px-2 py-1 text-xs',
        lg: 'px-6 py-3 text-base',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'default',
      fullWidth: false,
    },
  }
);

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const BaseButton = ({
  children,
  variant,
  size,
  rounded,
  fullWidth,
  className,
  ...props
}: BaseButtonProps) => (
  <button
    type="button"
    className={buttonVariants({
      variant,
      size,
      rounded,
      fullWidth,
      className,
    })}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </button>
);

export default BaseButton;
