import unpaidIcon from '../../assets/images/paymentrequest_status_unpaid.svg';
import paidIcon from '../../assets/images/paymentrequest_status_paid.svg';
import partiallyPaidIcon from '../../assets/images/paymentrequest_status_partial.svg';

interface StatusBadgeProps {
  status: 'UNPAID' | 'PARTIAL' | 'PAID';
}

const getIconForStatus = (status: 'UNPAID' | 'PARTIAL' | 'PAID') => {
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

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div
      className={`rounded-full py-1 px-2 space-x-2 inline-block ${
        status === 'PAID' ? 'bg-[#D8F2EA] text-[#008055]' : 'bg-[#F1F3F4] text-[#00264D]'
      }`}
    >
      <img className="h-3 w-3 float-left mt-0.5" src={getIconForStatus(status)} alt={status} />
      <span className="text-xs font-normal uppercase float-right">{status}</span>
    </div>
  );
};

StatusBadge.componentProps = {
  status: String,
};

export default StatusBadge;
