import { useState } from 'react';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import UIPaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';

import { PaymentResult, Currency } from '../../../api/types/Enums';

interface PaymentRequestTableProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string;
}

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

const parseApiCurrencyToLocalCurrency = (currency: Currency): LocalCurrency => {
  switch (currency) {
    case Currency.EUR:
      return 'EUR';
    case Currency.GBP:
      return 'GBP';
    default:
      return 'EUR';
  }
};

const PaymentRequestTable = ({ token, apiUrl = 'https://api.nofrixion.com/api/v1' }: PaymentRequestTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { paymentRequests, totalRecords } = usePaymentRequests(apiUrl, token, page, pageSize);

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
    currency: parseApiCurrencyToLocalCurrency(paymentRequest.currency),
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

export default PaymentRequestTable;
