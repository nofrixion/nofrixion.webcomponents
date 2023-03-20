import { useState } from 'react';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import UIPaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';

import { LocalPaymentRequest, LocalPaymentStatus } from '../../../types';
import { PaymentResult, Currency } from '../../../api/types/Enums';

interface PaymentRequestTableProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

// TODO: Move this mapping to a class or function
// Reference: https://martinfowler.com/articles/modularizing-react-apps.html
const parseApiStatusToLocalStatus = (status: PaymentResult): LocalPaymentStatus => {
  switch (status) {
    case PaymentResult.FullyPaid:
      return 'paid';
    case PaymentResult.PartiallyPaid:
      return 'partial';
    default:
      return 'unpaid';
  }
};

const PaymentRequestTable = ({ token, apiUrl = 'https://api.nofrixion.com/api/v1' }: PaymentRequestTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { paymentRequests, totalRecords } = usePaymentRequests(apiUrl, token, page, pageSize);

  // TODO: Move this mapping to a class or function
  // Reference: https://martinfowler.com/articles/modularizing-react-apps.html
  const localPaymentRequests: LocalPaymentRequest[] = paymentRequests.map((paymentRequest) => ({
    status: parseApiStatusToLocalStatus(paymentRequest.status),
    createdAt: new Date(paymentRequest.inserted),
    contact: {
      name: paymentRequest.addresses.length
        ? `${paymentRequest.addresses[0].firstName} ${paymentRequest.addresses[0].lastName}`
        : '',
      email: paymentRequest.customerEmailAddress ?? '',
    },
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
    tags: [], // TODO: Add tags when they are available in the API
  }));

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
