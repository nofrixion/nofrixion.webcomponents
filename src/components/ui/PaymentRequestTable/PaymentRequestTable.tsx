import classNames from 'classnames';
import Pager from '../Pager/Pager';
import PaymentRequestRow from '../PaymentRequestRow/PaymentRequestRow';
import ColumnHeader, { SortDirection } from '../ColumnHeader/ColumnHeader';
import { LocalPaymentRequest } from '../../../types';

interface PaymentRequestTableProps {
  paymentRequests: LocalPaymentRequest[];
  pageSize: number;
  totalRecords: number;
  onPaymentRequestClicked?: (paymentRequest: LocalPaymentRequest) => void;
  onPageChanged?: (newPage: number) => void;
  setStatusSortDirection?: (sortDirection: SortDirection) => void;
  setCreatedSortDirection?: (sortDirection: SortDirection) => void;
  setContactSortDirection?: (sortDirection: SortDirection) => void;
  setAmountSortDirection?: (sortDirection: SortDirection) => void;
}

const commonThClasses = 'px-4 pb-4 font-normal';

const PaymentRequestTable = ({
  paymentRequests,
  pageSize,
  totalRecords,
  onPaymentRequestClicked,
  onPageChanged,
  setStatusSortDirection,
  setCreatedSortDirection,
  setContactSortDirection,
  setAmountSortDirection,
}: PaymentRequestTableProps) => {
  return (
    <table className="table-fixed text-left w-full">
      <thead>
        <tr>
          <th className={classNames(commonThClasses, 'w-44 text-left')}>
            <ColumnHeader
              label="Status"
              onSort={(sortDirection) => setStatusSortDirection && setStatusSortDirection(sortDirection)}
            />
          </th>
          <th className={classNames(commonThClasses, 'w-44 text-left')}>
            <ColumnHeader
              label="Created"
              onSort={(sortDirection) => setCreatedSortDirection && setCreatedSortDirection(sortDirection)}
            />
          </th>
          <th className={classNames(commonThClasses, 'w-44 text-left')}>
            <ColumnHeader
              label="Contact"
              onSort={(sortDirection) => setContactSortDirection && setContactSortDirection(sortDirection)}
            />
          </th>
          <th className={classNames(commonThClasses, 'w-44 text-right')}>
            <ColumnHeader
              label="Amount"
              onSort={(sortDirection) => setAmountSortDirection && setAmountSortDirection(sortDirection)}
            />
          </th>

          {/* Currency */}
          <th className={classNames('pb-11 w-20')}></th>

          {/* 
            Tags column 
            However, it's used to display the
            pagination component in the table header
          */}
          <th className={classNames(commonThClasses, 'pr-4')}>
            <Pager
              pageSize={pageSize}
              totalRecords={totalRecords}
              onPageChange={(newPage) => onPageChanged && onPageChanged(newPage)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {paymentRequests.map((paymentRequest, index) => (
          <PaymentRequestRow
            key={`pr-${index}`}
            {...paymentRequest}
            onClick={() => onPaymentRequestClicked && onPaymentRequestClicked(paymentRequest)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PaymentRequestTable;
