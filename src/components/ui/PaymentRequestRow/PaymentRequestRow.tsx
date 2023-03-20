import classNames from 'classnames';
import { LocalPaymentRequest } from '../../../types';
import { formatAmount, formatDate } from '../../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';
import StatusBadge from '../StatusBadge/StatusBadge';

interface PaymentRequestRowProps extends LocalPaymentRequest {
  onClick?: () => void;
}

const commonTdClasses = 'px-4 py-3';

const Row = ({ status, createdAt, contact, amount, currency, tags, onClick }: PaymentRequestRowProps) => {
  return (
    <tr
      className="border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]"
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

      <td className={classNames(commonTdClasses, 'space-x-1 text-right pr-4')}>
        {tags.map((tag, index) => (
          <Chip key={`tag-${index}`} label={tag} />
        ))}
      </td>
    </tr>
  );
};

export default Row;
