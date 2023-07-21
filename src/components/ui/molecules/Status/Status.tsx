import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import { Icon } from '../../atoms';
import { IconNames } from '../../atoms/Icon/Icon';

const statusVariants = cva('rounded-full space-x-1 inline-flex items-center text-default-text', {
  variants: {
    variant: {
      paid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
      partial: ['bg-[#FCF5CF]', 'text-[#663300]'],
      unpaid: ['bg-[#F1F3F4]', 'text-default-text'],
    },
    size: {
      small: ['text-xs', 'font-normal', 'py-1', 'px-2'],
      large: ['text-sm', 'font-medium', 'leading-[17px]', 'px-4', 'py-2'],
    },
  },
  defaultVariants: {
    variant: 'unpaid',
    size: 'small',
  },
});

const iconVariants = cva('w-auto', {
  variants: {
    variant: {
      paid: ['text-[#29A37A]'],
      partial: ['text-[#B25900]'],
      unpaid: ['text-[#C8D0D0]'],
    },
    size: {
      small: ['h-2'],
      large: ['h-3'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {}

type TVariant = Exclude<Required<Pick<VariantProps<typeof statusVariants>, 'variant'>>['variant'], null | undefined>;

const iconName: Record<TVariant, Record<'small' | 'large', IconNames>> = {
  paid: {
    small: 'done/12',
    large: 'done/12',
  },
  partial: {
    small: 'partial/12',
    large: 'partial/12',
  },
  unpaid: {
    small: 'not-started/12',
    large: 'not-started/12',
  },
};

const Status: React.FC<StatusProps> = ({ className, size = 'small', variant = 'unpaid', ...props }) => (
  <div className={cn(statusVariants({ variant, size }), className)} {...props}>
    {variant && <Icon name={iconName[variant][size ?? 'small']} className={cn(iconVariants({ size, variant }))} />}
    <span className="uppercase">{size === 'large' && variant === 'partial' ? 'partially paid' : variant}</span>
  </div>
);

Status.displayName = 'Status';

export { Status };
