import ellipseGrey from '../../../assets/images/ellipse.grey.svg';
import ellipseGreen from '../../../assets/images/ellipse.green.svg';
import ellipseOrange from '../../../assets/images/ellipse.orange.svg';
import ellipse from '../../../assets/images/ellipse.svg';

import { PaymentRequestStatus } from '../../../api/types/Enums';
import classNames from 'classnames';

export interface TabProps {
  status: PaymentRequestStatus;
  totalRecords: number;
}

const ellipseClassNames = (status: string) => {
  return classNames('mr-1.5', {
    'fill-[#ABB2BA]': status === PaymentRequestStatus.None,
    'fill-[#E88C30]': status === PaymentRequestStatus.PartiallyPaid,
    'fill-[#00CC88]': status === PaymentRequestStatus.FullyPaid,
  });
};

const getIconFillForStatus = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.PartiallyPaid:
      return ellipse;
    case PaymentRequestStatus.FullyPaid:
      return ellipse;
    case PaymentRequestStatus.None:
      return ellipse;
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
        <div className="flex items-center whitespace-nowrap">
          {getIconFillForStatus(status) && (
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              xmlns="http://www.w3.org/2000/svg"
              className={ellipseClassNames(status)}
            >
              <circle cx="3" cy="3" r="3" />
            </svg>
          )}
          <span className="text-sm leading-6 font-normal">{getDisplayTextForStatus(status)}</span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
