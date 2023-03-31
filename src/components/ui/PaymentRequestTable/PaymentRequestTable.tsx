import classNames from 'classnames';
import Pager from '../Pager/Pager';
import PaymentRequestRow from '../PaymentRequestRow/PaymentRequestRow';
import ColumnHeader, { SortDirection } from '../ColumnHeader/ColumnHeader';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { Toaster } from '../Toast/Toast';

interface PaymentRequestTableProps {
  paymentRequests: LocalPaymentRequest[];
  pageSize: number;
  totalRecords: number;
  onPaymentRequestClicked?: (paymentRequest: LocalPaymentRequest) => void;
  onPaymentRequestDuplicateClicked: (paymentRequest: LocalPaymentRequest) => void;
  onPaymentRequestDeleteClicked: (paymentRequest: LocalPaymentRequest) => void;
  onPaymentRequestCopyLinkClicked: (paymentRequest: LocalPaymentRequest) => void;
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
  onPaymentRequestDuplicateClicked,
  onPaymentRequestDeleteClicked,
  onPaymentRequestCopyLinkClicked,
  onPageChanged,
  setStatusSortDirection,
  setCreatedSortDirection,
  setContactSortDirection,
  setAmountSortDirection,
}: PaymentRequestTableProps) => {
  return (
    <>
      <table className="table-fixed text-left w-full bg-white">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="w-8" />
        </colgroup>
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
            <th className={classNames(commonThClasses, 'w-44 text-right pr-0')}>
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
            <th colSpan={2} className={commonThClasses}>
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
              onDuplicate={() => onPaymentRequestDuplicateClicked && onPaymentRequestDuplicateClicked(paymentRequest)}
              onDelete={() => onPaymentRequestDeleteClicked && onPaymentRequestDeleteClicked(paymentRequest)}
              onCopyLink={() => onPaymentRequestCopyLinkClicked && onPaymentRequestCopyLinkClicked(paymentRequest)}
            />
          ))}
        </tbody>
      </table>
      <Toaster positionY="top" positionX="right" duration={5000} />
    </>
  );
};

export default PaymentRequestTable;
