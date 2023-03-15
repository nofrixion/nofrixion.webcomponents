import unpaidIcon from '../../assets/images/paymentrequest_status_unpaid.svg';
import paidIcon from '../../assets/images/paymentrequest_status_paid.svg';
import partiallyPaidIcon from '../../assets/images/paymentrequest_status_partial.svg';
import { cva } from 'class-variance-authority';

const badge = cva('rounded-full py-1 px-2 space-x-2 inline-flex items-center', {
  variants: {
    intent: {
      paid: ['bg-[#D8F2EA]', 'text-[#004D33]'],
      partial: ['bg-[#F2EED8]', 'text-[#663300]'],
      unpaid: ['bg-[#F1F3F4]', 'text-default-text'],
    },
  },
  defaultVariants: {
    intent: 'unpaid',
  },
});

type Status = 'UNPAID' | 'PARTIAL' | 'PAID';

interface StatusBadgeProps {
  status: String;
}

const getIconForStatus = (status: Status) => {
  switch (status) {
    case 'PARTIAL':
      return partiallyPaidIcon;
    case 'PAID':
      return paidIcon;
    case 'UNPAID':
    default:
      return unpaidIcon;
  }
};

const parseStatus = (statusString: String) => {
  const statusArray = ['UNPAID', 'PARTIAL', 'PAID'];
  if (statusArray.includes(statusString.toUpperCase())) {
    return statusString.toUpperCase() as Status;
  }
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let parsedStatus = parseStatus(status);

  if (parsedStatus) {
    return (
      <div className={badge({ intent: parsedStatus.toLowerCase() })}>
        <img className="h-3 w-3" src={getIconForStatus(parsedStatus)} alt={parsedStatus} />
        <span className="text-xs font-normal uppercase">{parsedStatus}</span>
      </div>
    );
  }
};

StatusBadge.componentProps = {
  status: String,
};

export default StatusBadge;
