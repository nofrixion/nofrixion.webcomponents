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
  'card/24': (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M18.424 7H3.57214C2.70873 7 2.00879 7.72667 2.00879 8.62307V18.3615C2.00879 19.2579 2.70873 19.9845 3.57214 19.9845H18.424C19.2874 19.9845 19.9874 19.2579 19.9874 18.3615V8.62307C19.9874 7.72667 19.2874 7 18.424 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.00879 10H19.9874" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.9908 13H14.9932" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2593 13H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.00348 16H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.00586 6.48006V4.62307C4.00586 3.72667 4.74468 3 5.65607 3H21.333C22.2444 3 22.9832 3.72667 22.9832 4.62307V14.3615C22.9832 15.2579 22.2444 15.9845 21.333 15.9845H20.1998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'bank/24': (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M3 21L3.75943 18.3415C3.78784 18.2422 3.84236 18.1557 3.91528 18.0944C3.98819 18.0331 4.0758 18.0001 4.16571 18H19.8343C19.9242 18.0001 20.0118 18.0331 20.0847 18.0944C20.1576 18.1557 20.2122 18.2422 20.2406 18.3415L21 20.996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 10H19V18H5V10Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 21H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M20.9778 7.66065C21.0094 7.56246 21.0072 7.45597 20.9715 7.35928C20.9359 7.26258 20.869 7.18166 20.7822 7.13025L12.2181 2.06002C12.1523 2.0207 12.0777 2 12.0017 2C11.9258 2 11.8512 2.0207 11.7854 2.06002L3.21777 7.12666C3.131 7.17807 3.06411 7.259 3.02846 7.35569C2.9928 7.45239 2.99059 7.55888 3.02219 7.65707L3.68336 9.69358C3.71205 9.78275 3.7671 9.86032 3.84071 9.91531C3.91433 9.9703 4.00279 9.99993 4.09357 10H19.9134C20.0041 9.99993 20.0926 9.9703 20.1662 9.91531C20.2398 9.86032 20.2949 9.78275 20.3236 9.69358L20.9778 7.66065Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 7.5H3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'wallets/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M16.9435 17.4673H4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 12.5539V20.2609C17 20.7222 16.7893 21.1645 16.4143 21.4907C16.0391 21.8169 15.5304 22 15 22H6C5.46957 22 4.96086 21.8169 4.58578 21.4907C4.21071 21.1645 4 20.7222 4 20.2609V3.73913C4 3.27789 4.21071 2.83553 4.58578 2.50938C4.96086 2.18323 5.46957 2 6 2H13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7489 19.9978C10.6114 19.9978 10.5 19.8863 10.5 19.7489C10.5 19.6114 10.6114 19.5 10.7489 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.749 19.9978C10.8865 19.9978 10.9979 19.8863 10.9979 19.7489C10.9979 19.6114 10.8865 19.5 10.749 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4783 12.4979C20.7776 12.4979 23.4522 9.82326 23.4522 6.52396C23.4522 3.22466 20.7776 0.550049 17.4783 0.550049C14.179 0.550049 11.5044 3.22466 11.5044 6.52396C11.5044 9.82326 14.179 12.4979 17.4783 12.4979Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2705 3.24634H18.7664C17.8971 3.24634 17.0635 3.59165 16.4488 4.20632C15.8341 4.82099 15.4888 5.65466 15.4888 6.52393C15.4888 7.3932 15.8341 8.22686 16.4488 8.84153C17.0635 9.4562 17.8971 9.80151 18.7664 9.80151H19.2705"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.501 5.51123H17.9519" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.501 7.53662H17.9519" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'ellipsis/24': (className: string) => (
    <SVG className={cn(className, 'fill-current')} size="24">
      <circle cx="12.4998" cy="5.73905" r="1.56522" />
      <circle cx="12.4998" cy="12" r="1.56522" />
      <circle cx="12.4998" cy="18.2608" r="1.56522" />
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
  'return/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M3.5 14.498L0.5 11.498L3.5 8.49805" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M0.5 11.498H10.5C11.8261 11.498 13.0979 10.9713 14.0355 10.0336C14.9732 9.0959 15.5 7.82413 15.5 6.49805C15.5 5.17196 14.9732 3.9002 14.0355 2.96251C13.0979 2.02483 11.8261 1.49805 10.5 1.49805H6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  'capture/12': (className: string) => (
    <SVG className={className} size="12">
      <path
        d="M0.5 6C0.5 7.45869 1.07946 8.85764 2.11091 9.88909C3.14236 10.9205 4.54131 11.5 6 11.5C7.45869 11.5 8.85764 10.9205 9.88909 9.88909C10.9205 8.85764 11.5 7.45869 11.5 6C11.5 4.54131 10.9205 3.14236 9.88909 2.11091C8.85764 1.07946 7.45869 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4L5.87579 7.71273C5.8175 7.79499 5.74327 7.86304 5.6581 7.91227C5.57293 7.96151 5.4788 7.9908 5.38206 7.99816C5.28532 8.00552 5.18822 7.99078 5.0973 7.95493C5.00638 7.91909 4.92376 7.86298 4.85501 7.79037L3.5 6.35245"
        strokeLinecap="round"
        strokeLinejoin="round"
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
