import ellipseGrey from '../../../assets/images/ellipse.grey.svg';
import ellipseGreen from '../../../assets/images/ellipse.green.svg';
import ellipseOrange from '../../../assets/images/ellipse.orange.svg';
import { PaymentRequestStatus } from '../../../api/types/Enums';

export interface TabProps {
  status: PaymentRequestStatus;
  totalRecords: number;
}

const getIconForStatus = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.PartiallyPaid:
      return ellipseOrange;
    case PaymentRequestStatus.FullyPaid:
      return ellipseGreen;
    case PaymentRequestStatus.None:
      return ellipseGrey;
    default:
      return;
  }
};

const getDisplayTextForStatus = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.PartiallyPaid:
      return 'Partially paid';
    case PaymentRequestStatus.FullyPaid:
      return 'Paid';
    case PaymentRequestStatus.None:
      return 'Unpaid';
    default:
      return 'All';
  }
};

const Tab = ({ status, totalRecords }: TabProps) => {
  return (
    <div>
      <div className="flex flex-col items-center px-8">
        <span className="text-[1.25rem] leading-7 font-semibold tabular-nums">{totalRecords}</span>
        <div className="flex items-center space-x-1 whitespace-nowrap">
          {getIconForStatus(status) && <img src={getIconForStatus(status)} alt="ellipse" className="pr-1" />}
          <span className="text-sm leading-6 font-normal">{getDisplayTextForStatus(status)}</span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
