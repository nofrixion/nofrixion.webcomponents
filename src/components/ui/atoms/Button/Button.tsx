import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Icon } from '@/components/ui/atoms';

const buttonVariants = cva(
  'rounded-full inline-flex items-center justify-center whitespace-nowrap align-middle cursor-pointer transition w-full disabled:opacity-20 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: ['bg-primaryGreen', 'text-white', 'hover:bg-primaryGreenHover', 'stroke:white'],
        primaryDark: ['bg-[#006A80]', 'text-white', 'hover:bg-[#144752]', 'stroke:white'],
        secondary: ['bg-secondaryButton', 'text-default-text', 'hover:bg-secondaryButtonHover'],
        tertiary: ['border', 'border-borderGrey', 'hover:border-borderGreyHighlighted', 'text-default-text'],
        text: ['text-greyText', 'hover:text-greyTextHover'],
      },
      size: {
        big: ['text-base', 'px-3', 'py-3', 'md:px-6', 'font-normal', 'leading-6'],
        medium: ['text-sm', 'px-4', 'py-2', 'font-normal', 'leading-6'],
        small: ['text-[0.813rem]', 'py-1', 'px-3', 'font-normal', 'leading-6'],
        'x-small': ['text-[0.813rem]', 'py-1', 'px-3', 'font-normal', 'leading-4'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'big',
    },
  },
);

const arrow = cva('w-full h-full', {
  variants: {
    variant: {
      primary: ['text-white'],
      primaryDark: ['text-white'],
      secondary: ['text-[#454D54]'],
      tertiary: ['text-[#454D54]'],
      text: ['text-[#454D54]', 'hover:text-greyTextHover'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const arrowContainer = cva('', {
  variants: {
    size: {
      big: ['w-4', 'h-4'],
      medium: ['w-4', 'h-4'],
      small: ['w-4', 'h-4'],
      'x-small': ['w-3', 'h-3'],
    },
  },
  defaultVariants: {
    size: 'big',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  previousArrow?: boolean;
  nextArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant, size, previousArrow, nextArrow, className, children, ...props }) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {previousArrow && (
        <div className={cn(arrowContainer({ size }), 'mr-2')}>
          <Icon name="back/16" className={arrow({ variant })} />
        </div>
      )}

      {children}

      {nextArrow && (
        <div className={cn(arrowContainer({ size }), 'ml-2')}>
          <Icon name="next/16" className={arrow({ variant })} />
        </div>
      )}
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
