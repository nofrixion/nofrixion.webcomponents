import unpaidIcon from '../../../assets/images/paymentrequest_status_unpaid.svg';
import paidIcon from '../../../assets/images/paymentrequest_status_paid.svg';
import partiallyPaidIcon from '../../../assets/images/paymentrequest_status_partial.svg';
import { VariantProps, cva } from 'class-variance-authority';
import { LocalPaymentStatus } from '../../../types/LocalTypes';

const badge = cva('rounded-full  space-x-2 inline-flex items-center', {
  variants: {
    intent: {
      paid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
      partial: ['bg-[#F2EED8]', 'text-[#663300]'],
      unpaid: ['bg-[#F1F3F4]', 'text-defaultText'],
      overpaid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
    },
    size: {
      small: ['text-xs', 'font-normal', 'py-1', 'px-2'],
      large: ['text-sm', 'font-medium', 'leading-[17px]', 'px-4', 'py-2'],
    },
  },
  defaultVariants: {
    intent: 'unpaid',
    size: 'small',
  },
});

const icon = cva('w-auto', {
  variants: {
    size: {
      small: ['h-2'],
      large: ['h-3'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface PaymentRequestStatusBadgeProps {
  status: LocalPaymentStatus;
  size: VariantProps<typeof badge>['size'];
}

const getIconForStatus = (status: LocalPaymentStatus) => {
  switch (status) {
    case 'partial':
      return partiallyPaidIcon;
    case 'paid':
    case 'overpaid':
      return paidIcon;
    case 'unpaid':
    default:
      return unpaidIcon;
  }
};

const PaymentRequestStatusBadge = ({ status, size }: PaymentRequestStatusBadgeProps) => {
  return (
    <div className={badge({ intent: status, size: size })}>
      <img className={icon({ size: size })} src={getIconForStatus(status)} alt={status} />
      <span className="uppercase">{size === 'large' && status === 'partial' ? 'partially paid' : status}</span>
    </div>
  );
};

export default PaymentRequestStatusBadge;
