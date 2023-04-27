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
  page: number,
  pageSize?: number,
  fromDate?: Date,
  toDate?: Date,
  status?: PaymentRequestStatus,
) => {
  const client = new MoneyMoovApiClient(apiUrl, authToken, merchantId);

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [apiError, setApiError] = useState<ApiError>();

  const fetchPaymentRequests = async () => {
    const response = await client.PaymentRequests.getAll(page, pageSize, sortExpression, fromDate, toDate, status);

    if (response.data) {
      setPaymentRequests(response.data.content);
      setPageNumber(response.data.pageNumber);
      setTotalRecords(response.data.totalSize);
    } else if (response.error) {
      setApiError(response.error);
    }
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
    fromDate,
    toDate,
    status,
  ]);

  return {
    paymentRequests,
    pageNumber,
    totalRecords,
    apiError,
    fetchPaymentRequests,
  };
};
