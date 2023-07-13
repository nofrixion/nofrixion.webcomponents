import { VariantProps, cva } from 'class-variance-authority';
import classNames from 'classnames';
import { cn } from '../../../utils';

const button = cva(
  'rounded-full inline-flex items-center justify-center whitespace-nowrap align-middle cursor-pointer transition w-full disabled:opacity-20 disabled:cursor-not-allowed',
  {
    variants: {
      type: {
        primary: ['bg-primaryGreen', 'text-white', 'hover:bg-primaryGreenHover', 'stroke:white'],
        secondary: ['bg-secondaryButton', 'text-defaultText', 'hover:bg-secondaryButtonHover'],
        tertiary: ['border', 'border-borderGrey', 'hover:border-borderGreyHighlighted', 'text-defaultText'],
        text: ['text-greyText', 'hover:text-greyTextHover'],
        darkPrimary: ['bg-[#006A80]', 'text-white', 'hover:bg-[#144752]', 'stroke:white'],
      },
      size: {
        big: ['text-base', 'px-3', 'py-3', 'md:px-6', 'font-normal', 'leading-6'],
        medium: ['text-sm', 'px-4', 'py-2', 'font-normal', 'leading-6'],
        small: ['text-[13px]', 'py-1', 'px-3', 'font-normal', 'leading-6'],
        xsmall: ['text-[13px]', 'py-1', 'px-3', 'font-normal', 'leading-4'],
      },
    },
    defaultVariants: {
      type: 'primary',
      size: 'big',
    },
  },
);

const arrow = cva('w-full h-full fill-none stroke-current', {
  variants: {
    type: {
      primary: ['text-white'],
      secondary: ['text-[#454D54]'],
      tertiary: ['text-[#454D54]'],
      text: ['text-[#454D54]', 'hover:text-greyTextHover'],
      darkPrimary: ['text-white'],
    },
  },
  defaultVariants: {
    type: 'primary',
  },
});

const arrowContainer = cva('', {
  variants: {
    size: {
      big: ['w-4', 'h-4'],
      medium: ['w-4', 'h-4'],
      small: ['w-4', 'h-4'],
      xsmall: ['w-3', 'h-3'],
    },
  },
  defaultVariants: {
    size: 'big',
  },
});

interface ButtonProps {
  label: string;
  type?: VariantProps<typeof button>['type'];
  size?: VariantProps<typeof button>['size'];
  previousArrow?: boolean;
  nextArrow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  label,
  type = 'primary',
  size = 'big',
  previousArrow,
  nextArrow,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button className={cn(button({ type: type, size: size }), className)} onClick={onClick} disabled={disabled}>
      {previousArrow && (
        <div className={arrowContainer({ size: size })}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" className={arrow({ type: type })}>
            <path d="M7.66665 14.3333L1 7.66665L7.66665 1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 7.72119H17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <p className="mx-2 text-center">{label}</p>

      {nextArrow && (
        <div className={arrowContainer({ size: size })}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" className={arrow({ type: type })}>
            <path d="M10.3333 0.999946L17 7.6666L10.3333 14.3333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 7.61206L1.00003 7.61206" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;
