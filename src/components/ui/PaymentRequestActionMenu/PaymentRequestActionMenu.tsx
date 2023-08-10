import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import copyIcon from '../../../assets/images/nf_copy.svg';
import linkIcon from '../../../assets/images/nf_link.svg';
import trashIcon from '../../../assets/images/nf_trash.svg';
import openIcon from '../../../assets/images/nf_open.svg';
import trashDisabledIcon from '../../../assets/images/nf_trash_disabled.svg';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

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

interface PaymentRequestActionMenuProps {
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
  onBlur?: () => void;
  onOpenPaymentPage?: () => void;
}

interface PaymentRequestActionMenuItemContentProps {
  label: string;
  iconSource: string;
}

const PaymentRequestActionMenuItemContent = ({ label, iconSource }: PaymentRequestActionMenuItemContentProps) => {
  return (
    <div className="h-6 flex items-center">
      <div className="pr-2">
        <img src={iconSource} alt={label} className="w-4 h-4" />
      </div>
      {label}
    </div>
  );
};

const PaymentRequestActionMenu = ({
  onDuplicate,
  onCopyLink,
  onDelete,
  onBlur,
  onOpenPaymentPage,
}: PaymentRequestActionMenuProps) => {
  const onDuplicateClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onDuplicate);
  const onCopyLinkClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onCopyLink);
  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onDelete);
  const emptyClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();
  const onOpenPaymentPageClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onOpenPaymentPage);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg fill-[#8F99A3] hover:fill-[#454D54] data-[state='open']:fill-[#454D54]"
          aria-label="Actions"
          onBlur={onBlur}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" className="w-4 h-4" version="1.1">
            <circle cx="7.5" cy="1.5" r="1.5" className="currentColor" id="circle2" />
            <circle cx="7.5" cy="7.5" r="1.5" className="currentColor" id="circle4" />
            <circle cx="7.5" cy="13.5" r="1.5" className="currentColor" id="circle6" />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content asChild forceMount sideOffset={5} onClick={emptyClick}>
          <motion.div
            className="min-w-[150px] bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] space-y-2 p-4"
            initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
            animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
          >
            {onDuplicate && (
              <DropdownMenu.Item className={actionItem()} onClick={onDuplicateClick}>
                <PaymentRequestActionMenuItemContent label="Duplicate" iconSource={copyIcon} />
              </DropdownMenu.Item>
            )}
            {onOpenPaymentPage && (
              <DropdownMenu.Item className={actionItem()} onClick={onOpenPaymentPageClick}>
                <PaymentRequestActionMenuItemContent label="Open payment page" iconSource={openIcon} />
              </DropdownMenu.Item>
            )}
            {onCopyLink && (
              <DropdownMenu.Item className={actionItem()} onClick={onCopyLinkClick}>
                <PaymentRequestActionMenuItemContent label="Copy payment link" iconSource={linkIcon} />
              </DropdownMenu.Item>
            )}
            {onDelete ? (
              <DropdownMenu.Item className={actionItem({ intent: 'negative' })} onClick={onDeleteClick}>
                <PaymentRequestActionMenuItemContent label="Delete" iconSource={trashIcon} />
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item className={actionItem({ intent: 'disabled' })} disabled>
                <InfoTooltip
                  side="bottom"
                  className="w-full"
                  content="Payment requests that have already received payments cannot be deleted."
                >
                  <PaymentRequestActionMenuItemContent label="Delete not available" iconSource={trashDisabledIcon} />
                </InfoTooltip>
              </DropdownMenu.Item>
            )}
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PaymentRequestActionMenu;
