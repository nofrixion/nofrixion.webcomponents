import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const textVariants = cva('text-default-text', {
  variants: {
    variant: {
      h1: 'text-xl/6 mb-2 font-semibold',
      h2: 'text-red-500',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
});

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

const Text: React.FC<TextProps> = ({ className, variant, ...props }) => (
  <p className={cn(textVariants({ variant }), className)} {...props} />
);

Text.displayName = 'Text';

export { Text };
