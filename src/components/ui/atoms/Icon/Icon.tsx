import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const iconVariants = cva('stroke-current fill-none');

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size: '8' | '12' | '16' | '24';
}

const SVG: React.FC<SVGProps> = ({ className, size, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    {...props}
  >
    {children}
  </svg>
);

export const Icons = {
  'back/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M11 22L1 12L11 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 12H23" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'next/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M13 2L23 12L13 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 12L1 12" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'close/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M22 22L12 12L22 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L12 12L2 22" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'close/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M2 2L14 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2L2.00001 14" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'back/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M7.66665 14.5L1 8L7.66665 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 8H15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'next/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M8.33335 1.5L15 8L8.33335 14.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8L1 8" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'done/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M1.5 6.31579L4.34211 9.15789L10.5 3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'not-started/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <circle cx="6" cy="6" r="4" />
    </SVG>
  ),
  'partial/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <path d="M2 10H10L2 2V10Z" />
    </SVG>
  ),
  'cancelled/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70712 2.2929C3.3166 1.90237 2.68343 1.90236 2.2929 2.29288C1.90237 2.6834 1.90236 3.31657 2.29288 3.7071L4.58685 6.00112L2.29314 8.29488C1.90262 8.68541 1.90263 9.31858 2.29316 9.7091C2.68369 10.0996 3.31686 10.0996 3.70738 9.70908L6.00104 7.41535L8.2947 9.70908C8.68522 10.0996 9.31839 10.0996 9.70892 9.7091C10.0994 9.31858 10.0995 8.68541 9.70894 8.29489L7.41524 6.00112L9.7092 3.7071C10.0997 3.31657 10.0997 2.6834 9.70918 2.29288C9.31865 1.90236 8.68548 1.90237 8.29497 2.2929L6.00104 4.58689L3.70712 2.2929Z"
      />
    </SVG>
  ),
  'arrow-down/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M0.5 2L4 5.5L7.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
} as const;

export type IconNames = keyof typeof Icons;

export interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string;
  name: IconNames;
}

const Icon: React.FC<IconProps> = ({ className, name }) => Icons[name](cn(iconVariants(), className));

Icon.displayName = 'Icon';

export { Icon };
