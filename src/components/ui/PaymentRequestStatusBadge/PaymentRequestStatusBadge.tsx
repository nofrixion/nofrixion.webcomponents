import unpaidIcon from '../../../assets/images/paymentrequest_status_unpaid.svg';
import paidIcon from '../../../assets/images/paymentrequest_status_paid.svg';
import partiallyPaidIcon from '../../../assets/images/paymentrequest_status_partial.svg';
import { cva } from 'class-variance-authority';
import { LocalPaymentStatus } from '../../../api/types/LocalTypes';

const badge = cva('rounded-full py-1 px-2 space-x-2 inline-flex items-center', {
  variants: {
    intent: {
      paid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
      partial: ['bg-[#F2EED8]', 'text-[#663300]'],
      unpaid: ['bg-[#F1F3F4]', 'text-defaultText'],
    },
  },
  defaultVariants: {
    intent: 'unpaid',
  },
});

interface PaymentRequestStatusBadgeProps {
  status: LocalPaymentStatus;
}

const getIconForStatus = (status: LocalPaymentStatus) => {
  switch (status) {
    case 'partial':
      return partiallyPaidIcon;
    case 'paid':
      return paidIcon;
    case 'unpaid':
    default:
      return unpaidIcon;
  }
};

const PaymentRequestStatusBadge = ({ status }: PaymentRequestStatusBadgeProps) => {
  return (
    <div className={badge({ intent: status })}>
      <img className="h-2 w-auto" src={getIconForStatus(status)} alt={status} />
      <span className="text-xs font-normal uppercase">{status}</span>
    </div>
  );
};

export default PaymentRequestStatusBadge;