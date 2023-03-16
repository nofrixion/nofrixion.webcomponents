import { cva } from 'class-variance-authority';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Pencil1Icon, TrashIcon, DotsVerticalIcon } from '@radix-ui/react-icons';

const actionItem = cva(
  'group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[10px] select-none outline-none cursor-pointer data-[highlighted]:bg-gray-100',
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
  onEdit: () => void;
  onDelete: () => void;
}

const PaymentRequestActionMenu = ({ onEdit, onDelete }: PaymentRequestActionMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center bg-white outline-none cursor-pointer"
          aria-label="Actions"
        >
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {onEdit && (
            <DropdownMenu.Item className={actionItem()} onClick={onEdit}>
              Edit{' '}
              <div className="ml-auto pl-[20px]">
                <Pencil1Icon />
              </div>
            </DropdownMenu.Item>
          )}
          {onEdit && onDelete && <DropdownMenu.Separator className="h-[1px] bg-gray-100 m-[5px]" />}
          {onDelete && (
            <DropdownMenu.Item className={actionItem({ intent: 'negative' })} onClick={onDelete}>
              Delete{' '}
              <div className="ml-auto pl-[20px]">
                <TrashIcon />
              </div>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PaymentRequestActionMenu;
