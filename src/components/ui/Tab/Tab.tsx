import * as Tabs from '@radix-ui/react-tabs';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import classNames from 'classnames';

export interface TabProps {
  status: PaymentRequestStatus;
  totalRecords: number;
  isLoading?: boolean;
}

const getSpecificStatusClasses = (status: PaymentRequestStatus) => {
  return classNames({
    "fill-[#ABB2BA] data-[state='active']:border-[#73808C]": status === PaymentRequestStatus.None,
    "fill-[#ABB2BA] data-[state='active']:border-[#40BFBF]": status === PaymentRequestStatus.All,
    "fill-[#E88C30] data-[state='active']:border-[#E88C30]": status === PaymentRequestStatus.PartiallyPaid,
    "fill-[#00CC88] data-[state='active']:border-[#29A37A]": status === PaymentRequestStatus.FullyPaid,
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

const Tab = ({ status, totalRecords, isLoading = false }: TabProps) => {
  return (
    <Tabs.Trigger
      value={status}
      className={classNames(
        'flex flex-col items-center px-8 rounded-lg pt-6 pb-8 bg-white border-2 border-transparent transition w-full hover:border-borderGrey',
        getSpecificStatusClasses(status),
      )}
    >
      <span className="text-sm/6 font-normal flex items-center mb-4">
        {showIndicator(status) && (
          <div className="items-center whitespace-nowrap inline-block mr-1.5">
            <svg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" className="fill-inherit">
              <circle cx="3" cy="3" r="3" />
            </svg>
          </div>
        )}

        {getDisplayTextForStatus(status)}
      </span>

      <div className="relative flex">
        <div
          className={classNames(
            'animate-pulse absolute left-1/2 top-0 bottom-0 my-auto -translate-x-1/2 flex items-center',
            {
              invisible: !isLoading,
            },
          )}
        >
          <div className="h-2 w-8 bg-[#E0E9EB] rounded-lg"></div>
        </div>
        <span
          className={classNames('text-[1.75rem]/6 font-medium', {
            invisible: isLoading,
          })}
        >
          {totalRecords}
        </span>
      </div>
    </Tabs.Trigger>
  );
};

export default Tab;
