import classNames from 'classnames';
import Pager from '../Pager/Pager';
import PaymentRequestRow from '../PaymentRequestRow/PaymentRequestRow';
import ColumnHeader, { SortDirection } from '../ColumnHeader/ColumnHeader';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { Toaster } from '../Toast/Toast';

import EmptyState from './EmptyState';

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
  onCreatePaymentRequest?: () => void;
  isLoading?: boolean;
  isEmpty?: boolean; // True when there are no payment requests at all, even when filters are not applied
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
  isLoading = false,
  isEmpty = false,
  onCreatePaymentRequest,
}: PaymentRequestTableProps) => {
  return (
    <>
      {/* Show table when loading so the skeletons are visible */}
      {/* or else show the table when has payment requests */}
      {(isLoading || (paymentRequests && paymentRequests.length > 0)) && (
        <table className="table-fixed text-left w-full">
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
            {isLoading &&
              // Create array of 12 empty rows
              // to display a loading skeleton
              // while the data is being fetched
              // from the server
              Array.from(Array(12)).map((_, index) => (
                <tr key={`pr-placeholder-${index}`} className="animate-pulse border-b border-[#F1F2F3]">
                  {/* Status */}
                  <td className="py-6">
                    <div className="w-1/2 ml-4 h-2 bg-[#E0E9EB] rounded-lg" />
                  </td>

                  {/* Created */}
                  <td>
                    <div className="w-1/2 ml-4 h-2 bg-[#E0E9EB] rounded-lg" />
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="w-full ml-4 h-2 bg-[#E0E9EB] rounded-lg" />
                  </td>

                  {/* Amount */}
                  <td className="p-0">
                    <div className="w-3/4 ml-auto h-2 bg-[#E0E9EB] rounded-l-lg" />
                  </td>

                  <td className="p-0">
                    <div className="w-1/2 h-2 bg-[#E0E9EB] rounded-r-lg mr-4" />
                  </td>

                  {/* Extra */}
                  <td>
                    <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              paymentRequests.map((paymentRequest, index) => (
                <PaymentRequestRow
                  key={`pr-${index}`}
                  {...paymentRequest}
                  onClick={() => onPaymentRequestClicked && onPaymentRequestClicked(paymentRequest)}
                  onDuplicate={() =>
                    onPaymentRequestDuplicateClicked && onPaymentRequestDuplicateClicked(paymentRequest)
                  }
                  onDelete={
                    paymentRequest.paymentAttempts && paymentRequest.paymentAttempts.length > 0
                      ? undefined
                      : () => onPaymentRequestDeleteClicked && onPaymentRequestDeleteClicked(paymentRequest)
                  }
                  onCopyLink={() => onPaymentRequestCopyLinkClicked && onPaymentRequestCopyLinkClicked(paymentRequest)}
                />
              ))}
          </tbody>
        </table>
      )}

      {/* Show empty state when contet has loaded and no there are no payment requests*/}
      {/* or also show when isEmpty property comes as `true` */}
      {((!isLoading && paymentRequests && paymentRequests.length === 0) || isEmpty) && (
        // If `isEmpty` is true means that there're are no payment requests at all, no matter which tab is selected
        // Else,  there are no payment requests matching the filters
        <EmptyState state={isEmpty ? 'empty' : 'nothingFound'} onCreatePaymentRequest={onCreatePaymentRequest} />
      )}
      <Toaster positionY="top" positionX="right" duration={5000} />
    </>
  );
};

export default PaymentRequestTable;
