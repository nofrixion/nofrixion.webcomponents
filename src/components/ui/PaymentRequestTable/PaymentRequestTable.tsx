import classNames from 'classnames';
import Pager from '../Pager/Pager';
import PaymentRequestRow from '../PaymentRequestRow/PaymentRequestRow';

interface PaymentRequestTableProps {
  paymentRequests: LocalPaymentRequest[];
  pageSize: number;
  totalRecords: number;
  onPaymentRequestClicked?: (paymentRequest: LocalPaymentRequest) => void;
  onPageChanged?: (newPage: number) => void;
}

const commonThClasses = 'px-4 pb-11 font-normal';

const PaymentRequestTable = ({
  paymentRequests,
  pageSize,
  totalRecords,
  onPaymentRequestClicked,
  onPageChanged,
}: PaymentRequestTableProps) => {
  return (
    <table className="table-fixed text-left w-full">
      <thead>
        <tr>
          {/* TODO: Change for fitler components */}
          <th className={classNames(commonThClasses, 'w-36 pl-4')}>Status</th>
          <th className={classNames(commonThClasses, 'w-44')}>Created</th>
          <th className={classNames(commonThClasses, 'w-56')}>Contact</th>
          <th className={classNames(commonThClasses, 'w-44 text-right')}>Amount</th>

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
        {paymentRequests.map((paymentRequest) => (
          <PaymentRequestRow
            {...paymentRequest}
            onClick={() => onPaymentRequestClicked && onPaymentRequestClicked(paymentRequest)}
          />
        ))}
      </tbody>
    </table>
  );
};

PaymentRequestTable.componentProps = {
  label: String,
};

export default PaymentRequestTable;
