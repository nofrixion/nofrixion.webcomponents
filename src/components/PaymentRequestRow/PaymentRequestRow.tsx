import { formatAmount, formatDate } from '../../utils/formatters';
import Chip from '../Chip/Chip';
import Contact from '../Contact/Contact';

interface PaymentRequestRowProps {
  status: 'paid' | 'partial' | 'unpaid';
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: 'EUR' | 'GBP';
  tags: string[];
}

const Row = ({ status, createdAt, contact, amount, currency, tags }: PaymentRequestRowProps) => {
  return (
    <tr className="border-b border-[#F1F2F3]">
      {/* TODO: Replace status text for <Status> component */}
      <td className="py-3">{status.charAt(0).toUpperCase() + status.slice(1)}</td>

      <td className="text-sm">{formatDate(createdAt)}</td>

      <td>
        <Contact {...contact} />
      </td>

      <td className="text-right truncate">
        <span className="font-medium">{formatAmount(amount)}</span>
      </td>

      <td>
        <span className="ml-5 text-greyText">{currency}</span>
      </td>

      <td className="space-x-1 text-right">
        {tags.map((tag) => (
          <Chip label={tag} />
        ))}
      </td>
    </tr>
  );
};

export default Row;
