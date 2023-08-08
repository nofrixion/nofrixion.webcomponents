import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { Icon } from '../atoms';
import { LocalPaymentAttempt } from '@/types/LocalTypes';

const actionItemClassNames =
  'group text-xs leading-none rounded-1 flex items-center relative select-none outline-none cursor-pointer';
const actionItem = cva(actionItemClassNames, {
  variants: {
    intent: {
      neutral: ['data-[highlighted]:text-greyText'],
      negative: ['text-negativeRed data-[highlighted]:text-highlightedNegativeRed'],
      disabled: ['text-disabledText data-[highlighted]:text-greyText'],
    },
  },
  defaultVariants: {
    intent: 'neutral',
  },
});

const handleClick = (e: React.MouseEvent<HTMLDivElement>, handler?: () => void) => {
  if (handler) {
    handler();
  }

  e.stopPropagation();
};

interface PaymentAttemptActionMenuProps {
  onRefund: () => void;
  onBlur?: () => void;
}

interface PaymentAttemptActionMenuItemContentProps {
  label: string;
  iconName: 'return/12';
}

const PaymentAttemptActionMenuItemContent = ({ label, iconName }: PaymentAttemptActionMenuItemContentProps) => {
  return (
    <div className="h-6 flex items-center">
      <div className="pr-2">
        <Icon name={iconName} />
      </div>
      {label}
    </div>
  );
};

const PaymentAttemptActionMenu = ({ onRefund, onBlur }: PaymentAttemptActionMenuProps) => {
  const onRefundClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onRefund);
  const emptyClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-6 h-6 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg text-[#8F99A3] hover:text-controlGreyHover data-[state='open']:text-controlGreyHover"
          aria-label="Actions"
          onBlur={onBlur}
        >
          <Icon name="ellipsis/24" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal className="absolute z-[100]">
        <DropdownMenu.Content asChild forceMount sideOffset={5} onClick={emptyClick} className="z-[100]">
          <motion.div
            className="min-w-[150px] bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] space-y-2 p-4"
            initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
            animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
          >
            <DropdownMenu.Item className={actionItem()} onClick={onRefundClick}>
              <PaymentAttemptActionMenuItemContent label="Refund" iconName="return/12" />
            </DropdownMenu.Item>
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PaymentAttemptActionMenu;
