import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import menuIcon from '../../../assets/images/nf_menu.svg';
import copyIcon from '../../../assets/images/nf_copy.svg';
import linkIcon from '../../../assets/images/nf_link.svg';
import trashIcon from '../../../assets/images/nf_trash.svg';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

const actionItemClassNames =
  'group text-xs leading-none rounded-1 flex items-center relative select-none outline-none cursor-pointer';
const actionItem = cva(actionItemClassNames, {
  variants: {
    intent: {
      neutral: ['data-[highlighted]:text-greyText'],
      negative: ['text-negativeRed data-[highlighted]:text-highlightedNegativeRed'],
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

const PaymentRequestActionMenu = ({ onDuplicate, onCopyLink, onDelete, onBlur }: PaymentRequestActionMenuProps) => {
  const onDuplicateClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onDuplicate);
  const onCopyLinkClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onCopyLink);
  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, onDelete);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg group"
          aria-label="Actions"
          onBlur={onBlur}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className="group [&>circle]:fill-[#8F99A3] w-4 h-4"
            version="1.1"
          >
            <circle
              cx="7.5"
              cy="1.5"
              r="1.5"
              fill="none"
              className="group-hover:fill-[#454D54] group-data-[state='open']:fill-[#454D54]"
              id="circle2"
            />
            <circle
              cx="7.5"
              cy="7.5"
              r="1.5"
              fill="none"
              className="group-hover:fill-[#454D54] group-data-[state='open']:fill-[#454D54]"
              id="circle4"
            />
            <circle
              cx="7.5"
              cy="13.5"
              r="1.5"
              fill="none"
              className="group-hover:fill-[#454D54] group-data-[state='open']:fill-[#454D54]"
              id="circle6"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content asChild forceMount sideOffset={5}>
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
            {onCopyLink && (
              <DropdownMenu.Item className={actionItem()} onClick={onCopyLinkClick}>
                <PaymentRequestActionMenuItemContent label="Copy payment link" iconSource={linkIcon} />
              </DropdownMenu.Item>
            )}
            {onDelete && (
              <DropdownMenu.Item className={actionItem({ intent: 'negative' })} onClick={onDeleteClick}>
                <PaymentRequestActionMenuItemContent label="Delete" iconSource={trashIcon} />
              </DropdownMenu.Item>
            )}
          </motion.div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PaymentRequestActionMenu;
