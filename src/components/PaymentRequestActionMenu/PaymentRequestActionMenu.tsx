import { cva } from 'class-variance-authority';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import menuIcon from '../../assets/images/nf_menu.svg';
import copyIcon from '../../assets/images/nf_copy.svg';
import linkIcon from '../../assets/images/nf_link.svg';
import trashIcon from '../../assets/images/nf_trash.svg';

const actionItem = cva(
  'group text-xs leading-none rounded-1 flex items-center h-6 py-4 pr-4 relative select-none outline-none cursor-pointer data-[highlighted]:text-greyText',
  {
    variants: {
      intent: {
        neutral: [],
        negative: ['text-red-700'],
      },
    },
    defaultVariants: {
      intent: 'neutral',
    },
  },
);

interface PaymentRequestActionMenuProps {
  onDuplicate?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

interface PaymentRequestActionMenuItemContentProps {
  label: string;
  iconSource: string;
}

const PaymentRequestActionMenuItemContent = ({ label, iconSource }: PaymentRequestActionMenuItemContentProps) => {
  return (
    <>
      <div className="pl-4 pr-2">
        <img src={iconSource} alt={label} />
      </div>
      {label}
    </>
  );
};

const PaymentRequestActionMenu = ({ onDuplicate, onCopy, onDelete }: PaymentRequestActionMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle"
          aria-label="Actions"
        >
          <img src={menuIcon} alt="Actions" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {onDuplicate && (
            <DropdownMenu.Item className={actionItem()} onClick={onDuplicate}>
              <PaymentRequestActionMenuItemContent label="Duplicate" iconSource={copyIcon} />
            </DropdownMenu.Item>
          )}
          {onCopy && (
            <DropdownMenu.Item className={actionItem()} onClick={onCopy}>
              <PaymentRequestActionMenuItemContent label="Copy payment link" iconSource={linkIcon} />
            </DropdownMenu.Item>
          )}
          {onDelete && (
            <DropdownMenu.Item className={actionItem()} onClick={onDelete}>
              <PaymentRequestActionMenuItemContent label="Delete" iconSource={trashIcon} />
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PaymentRequestActionMenu;
