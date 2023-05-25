import { useState } from 'react';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import UIPaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';
import { RemotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';

interface PaymentRequestTableProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  merchantId: string; // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

const PaymentRequestTable = ({
  token,
  merchantId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
}: PaymentRequestTableProps) => {
  const [page, setPage] = useState(1);
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [contactSortDirection, setContactSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE);

  const pageSize = 20;
  const client = new PaymentRequestClient(apiUrl, token, merchantId);

  const { paymentRequests, totalRecords, fetchPaymentRequests } = usePaymentRequests(
    apiUrl,
    token,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    page,
    pageSize,
  );

  const localPaymentRequests: LocalPaymentRequest[] =
    paymentRequests?.map((paymentRequest) => RemotePaymentRequestToLocalPaymentRequest(paymentRequest)) ?? [];

  const onDeletePaymentRequest = async (paymentRequest: LocalPaymentRequest) => {
    const response = await client.delete(paymentRequest.id);

    if (response.error) {
      makeToast('error', response.error.title);
      return;
    }

    makeToast('success', 'Payment request successfully deleted.');

    await fetchPaymentRequests();
  };

  const onCopyPaymentRequestLink = async (paymentRequest: LocalPaymentRequest) => {
    let link = `${apiUrl}/nextgen/pay/${paymentRequest.id}`;
    await navigator.clipboard.writeText(link);

    makeToast('success', 'Link copied into clipboard.');
  };

  const onDuplicatePaymentRequest = (paymentRequest: LocalPaymentRequest) => {
    console.log('Duplicate payment request clicked: ', paymentRequest);
  };

  return (
    <UIPaymentRequestTable
      paymentRequests={localPaymentRequests}
      pageSize={pageSize}
      totalRecords={totalRecords}
      onPageChanged={setPage}
      setStatusSortDirection={setStatusSortDirection}
      setCreatedSortDirection={setCreatedSortDirection}
      setContactSortDirection={setContactSortDirection}
      setAmountSortDirection={setAmountSortDirection}
      onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
      onPaymentRequestDeleteClicked={onDeletePaymentRequest}
      onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
    />
  );
};

export default PaymentRequestTable;
