import classNames from 'classnames';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { formatAmount, formatDate } from '../../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu';

interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: () => void;
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
}

const commonTdClasses = 'px-4 py-3';

const Row = ({
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
  return (
    <tr
      className="border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-mainGrey hover:border-[#E1E5EA]"
      onClick={onClick}
    >
      <td className={classNames(commonTdClasses, 'pl-4 py-3')}>
        <StatusBadge status={status} />
      </td>

      <td className={classNames(commonTdClasses, 'text-13px')}>{formatDate(createdAt)}</td>

      <td className={classNames(commonTdClasses)}>
        <Contact {...contact} />
      </td>

      <td className={classNames(commonTdClasses, 'text-right truncate tabular-nums')}>
        <span className="font-medium">{formatAmount(amount)}</span>
      </td>

      <td className={'py-3'}>
        <span className="text-greyText text-sm block">{currency}</span>
      </td>

      <td className={classNames(commonTdClasses, 'space-x-1 text-right pr-1.5')}>
        {tags.map((tag, index) => (
          <Chip key={`tag-${index}`} label={tag.name} />
        ))}
      </td>

      <td className="pr-2 w-8">
        <PaymentRequestActionMenu onDuplicate={onDuplicate} onCopyLink={onCopyLink} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default Row;
