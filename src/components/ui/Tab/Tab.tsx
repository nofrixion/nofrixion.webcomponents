import * as Tabs from '@radix-ui/react-tabs';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import classNames from 'classnames';

export interface TabProps {
  status: PaymentRequestStatus;
  totalRecords: number;
}

const ellipseClassNames = (status: string) => {
  return classNames({
    'fill-[#ABB2BA]': status === PaymentRequestStatus.None,
    'fill-[#E88C30]': status === PaymentRequestStatus.PartiallyPaid,
    'fill-[#00CC88]': status === PaymentRequestStatus.FullyPaid,
  });
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

const showIndicator = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.None:
    case PaymentRequestStatus.PartiallyPaid:
    case PaymentRequestStatus.FullyPaid:
      return true;
    default:
      return false;
  }
};

const Tab = ({ status, totalRecords }: TabProps) => {
  return (
    <Tabs.Trigger
      value={status}
      className={classNames(
        ellipseClassNames(status),
        "flex flex-col items-center px-8 rounded-lg pt-6 pb-8 bg-white border-2 border-transparent transition w-full data-[state='active']:border-primaryGreen",
      )}
    >
      <span className="text-sm/6 font-normal flex items-center">
        {showIndicator(status) && (
          <div className="items-center whitespace-nowrap inline-block mr-1.5">
            <svg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" className="fill-inherit">
              <circle cx="3" cy="3" r="3" />
            </svg>
          </div>
        )}

        {getDisplayTextForStatus(status)}
      </span>
      <span className="text-[1.75rem]/6 font-medium mt-4">{totalRecords}</span>
    </Tabs.Trigger>
  );
};

export default Tab;
