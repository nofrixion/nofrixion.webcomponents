import { useEffect, useState } from 'react';
import { SortDirection } from '../../components/ui/ColumnHeader/ColumnHeader';
import { formatPaymentRequestSortExpression } from '../../utils/formatters';
import MoneyMoovApiClient from '../clients/MoneyMoovApiClient';
import { ApiError, PaymentRequest } from '../types/ApiResponses';
import { PaymentRequestStatus } from '../types/Enums';

export const usePaymentRequests = (
  apiUrl: string,
  authToken: string,
  merchantId: string,
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  contactSortDirection: SortDirection,
  amountSortDirection: SortDirection,
  onUnauthorized: () => void,
  page: number,
  pageSize?: number,
  fromDateMs?: number,
  toDateMs?: number,
  status?: PaymentRequestStatus,
) => {
  const client = new MoneyMoovApiClient(apiUrl, authToken, merchantId, onUnauthorized);

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[] | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [apiError, setApiError] = useState<ApiError>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPaymentRequests = async () => {
    setIsLoading(true);
    const response = await client.PaymentRequests.getAll(
      page,
      pageSize,
      sortExpression,
      new Date(fromDateMs ?? 0),
      new Date(toDateMs ?? 0),
      status,
    );

    console.log('Payment Requests response', response);

    if (response.data) {
      setPaymentRequests(response.data.content);
      setPageNumber(response.data.pageNumber);
      setTotalRecords(response.data.totalSize);
    } else if (response.error) {
      setApiError(response.error);
    }

    setIsLoading(false);
  };

  // Build the sort expression
  const sortExpression = formatPaymentRequestSortExpression(
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
  );

  useEffect(() => {
    fetchPaymentRequests();
  }, [
    page,
    apiUrl,
    merchantId,
    authToken,
    pageSize,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    fromDateMs,
    toDateMs,
    status,
  ]);

  return {
    paymentRequests,
    pageNumber,
    totalRecords,
    apiError,
    fetchPaymentRequests,
    isLoading,
  };
};
