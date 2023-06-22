import classNames from 'classnames';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { formatAmount, formatDate } from '../../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu';
import { animate, AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
  onOpenPaymentPage?: () => void;
}

const commonTdClasses = 'px-4 py-3';

const Row = ({
  id,
  status,
  createdAt,
  contact,
  amount,
  currency,
  tags,
  onClick,
  onDuplicate,
  onCopyLink,
  onDelete,
  onOpenPaymentPage,
}: PaymentRequestRowProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeletePaymentRequestClicked = async () => {
    setIsDeleting(true);
    animate(`.custom-backdrop-blur-${id}`, { opacity: 0.2 }, { duration: 0.2 });
  };

  const onCancelDeletingPaymentRequestClicked = async () => {
    setIsDeleting(false);
    animate(`.custom-backdrop-blur-${id}`, { opacity: 1 }, { duration: 0.2 });
  };

  const onConfirmDeletePaymentRequestClicked = async () => {
    onDelete && onDelete();
    await onCancelDeletingPaymentRequestClicked();
  };

  return (
    <tr
      className={`relative border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]`}
      onClick={onClick}
    >
      <td className={classNames(commonTdClasses, `pl-4 py-0`)}>
        <AnimatePresence>
          {isDeleting && (
            <motion.div
              className={`flex absolute z-10 items-center left-0 top-0 bottom-0 my-auto w-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ml-auto mr-11 space-x-1">
                <button
                  className="bg-negativeRed rounded px-5 py-2 text-white font-normal text-sm hover:bg-darkerNegativeRed"
                  onClick={onConfirmDeletePaymentRequestClicked}
                >
                  Delete
                </button>
                <button
                  className="bg-white rounded px-5 py-2 text-defaultText font-normal text-sm hover:text-greyText"
                  onClick={onCancelDeletingPaymentRequestClicked}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`custom-backdrop-blur-${id}`}>
          <StatusBadge status={status} />
        </div>
      </td>

      <td className={classNames(commonTdClasses, `text-13px custom-backdrop-blur-${id}`)}>{formatDate(createdAt)}</td>

      <td className={classNames(commonTdClasses, `custom-backdrop-blur-${id}`)}>
        <Contact {...contact} />
      </td>

      <td className={classNames(commonTdClasses, `text-right truncate tabular-nums custom-backdrop-blur-${id}`)}>
        <span className="font-medium">{formatAmount(amount)}</span>
      </td>

      <td className={`py-3 custom-backdrop-blur-${id}`}>
        <span className="text-greyText text-sm block">{currency}</span>
      </td>

      <td className={classNames(commonTdClasses, `space-x-1 text-right pr-1.5 custom-backdrop-blur-${id}`)}>
        {tags.map((tag, index) => (
          <Chip key={`tag-${index}`} label={tag.name} />
        ))}
      </td>

      <td className={`pr-2 w-8 custom-backdrop-blur-${id}`}>
        <PaymentRequestActionMenu
          onDuplicate={onDuplicate}
          onCopyLink={onCopyLink}
          onDelete={onDelete ? onDeletePaymentRequestClicked : undefined}
          onBlur={onCancelDeletingPaymentRequestClicked}
          onOpenPaymentPage={onOpenPaymentPage}
        />
      </td>
    </tr>
  );
};

export default Row;
