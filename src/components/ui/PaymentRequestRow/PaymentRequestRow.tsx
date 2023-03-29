import classNames from 'classnames';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { formatAmount, formatDate } from '../../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu';
import { animate, AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: () => void;
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
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
}: PaymentRequestRowProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const overlayRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    console.log('CALLED ' + id);
    if (rowRef.current && overlayRowRef.current && isDeleting) {
      let { top } = rowRef.current.getBoundingClientRect();
      top += window.scrollY;
      top -= 6; // 6px padding
      overlayRowRef.current.setAttribute('style', `top: ${top}px`);
    }
  }, [isDeleting]);

  const onDeletePaymentRequestClicked = async () => {
    setIsDeleting(true);
    animate(`tr.custom-backdrop-blur-${id}`, { opacity: 0.2 }, { duration: 0.2 });
  };

  const onCancelDeletingPaymentRequestClicked = async () => {
    setIsDeleting(false);
    animate(`tr.custom-backdrop-blur-${id}`, { opacity: 1 }, { duration: 0.2 });
  };

  const onConfirmDeletePaymentRequestClicked = async () => {
    onDelete && onDelete();
    await onCancelDeletingPaymentRequestClicked();
  };

  return (
    <>
      <tr
        ref={rowRef}
        className={`border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA] custom-backdrop-blur-${id}`}
        onClick={onClick}
      >
        <td className={classNames(commonTdClasses, `pl-4 py-3`)}>
          <StatusBadge status={status} />
        </td>

        <td className={classNames(commonTdClasses, `text-13px`)}>{formatDate(createdAt)}</td>

        <td className={classNames(commonTdClasses)}>
          <Contact {...contact} />
        </td>

        <td className={classNames(commonTdClasses, `text-right truncate tabular-nums`)}>
          <span className="font-medium">{formatAmount(amount)}</span>
        </td>

        <td className={`py-3`}>
          <span className="text-greyText text-sm block">{currency}</span>
        </td>

        <td className={classNames(commonTdClasses, 'space-x-1 text-right pr-1.5')}>
          {tags.map((tag, index) => (
            <Chip key={`tag-${index}`} label={tag.name} />
          ))}
        </td>

        <td className="pr-2 w-8">
          <PaymentRequestActionMenu
            onDuplicate={onDuplicate}
            onCopyLink={onCopyLink}
            onDelete={onDeletePaymentRequestClicked}
          />
        </td>
      </tr>
      {isDeleting && (
        <AnimatePresence>
          <motion.tr
            ref={overlayRowRef}
            className={`absolute w-100 items-end right-11 py-3 text-right space-x-1`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td>
              <button
                className="bg-negativeRed rounded px-5 py-2 text-white font-normal text-sm"
                onClick={onConfirmDeletePaymentRequestClicked}
              >
                Delete
              </button>
              <button
                className="bg-white rounded px-5 py-2 text-defaultText font-normal text-sm"
                onClick={onCancelDeletingPaymentRequestClicked}
              >
                Cancel
              </button>
            </td>
          </motion.tr>
        </AnimatePresence>
      )}
    </>
  );
};

export default Row;
