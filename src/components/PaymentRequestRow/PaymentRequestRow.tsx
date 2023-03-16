import { formatAmount, formatDate } from '../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';
import PaymentRequestStatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu';

interface PaymentRequestRowProps {
  status: 'paid' | 'partial' | 'unpaid';
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: 'EUR' | 'GBP';
  tags: string[];
  onClick?: () => void;
  onDuplicate?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

const Row = ({
  status,
  createdAt,
  contact,
  amount,
  currency,
  tags,
  onClick,
  onDuplicate,
  onCopy,
  onDelete,
}: PaymentRequestRowProps) => {
  return (
    <tr
      className="border-b border-[#F1F2F3] cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]"
      onClick={onClick}
    >
      {/* TODO: Replace status text for <Status> component */}
      <td className="pl-4 py-3">
        <PaymentRequestStatusBadge status={status} />
      </td>

      <td className="text-13px">{formatDate(createdAt)}</td>

      <td>
        <Contact {...contact} />
      </td>

      <td className="text-right truncate tabular-nums">
        <span className="font-medium">{formatAmount(amount)}</span>
      </td>

      <td>
        <span className="ml-5 text-greyText text-sm">{currency}</span>
      </td>

      <td className="space-x-1 text-right pr-4">
        {tags.map((tag) => (
          <Chip label={tag} />
        ))}

        <PaymentRequestActionMenu onDuplicate={onDuplicate} onCopy={onCopy} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default Row;
