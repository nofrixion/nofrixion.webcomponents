import { useState } from 'react';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import UIPaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';

import { RemotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';

interface PaymentRequestTableProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

const PaymentRequestTable = ({ token, apiUrl = 'https://api.nofrixion.com/api/v1' }: PaymentRequestTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { paymentRequests, totalRecords } = usePaymentRequests(apiUrl, token, page, pageSize);

  const localPaymentRequests: LocalPaymentRequest[] = paymentRequests.map((paymentRequest) =>
    RemotePaymentRequestToLocalPaymentRequest(paymentRequest),
  );

  return (
    <UIPaymentRequestTable
      paymentRequests={localPaymentRequests}
      pageSize={pageSize}
      totalRecords={totalRecords}
      onPageChanged={setPage}
    />
  );
};

PaymentRequestTable.componentProps = {
  token: String,
  apiUrl: String,
};

export default PaymentRequestTable;
