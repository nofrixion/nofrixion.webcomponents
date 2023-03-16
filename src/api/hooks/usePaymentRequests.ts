import { useEffect, useState } from 'react';
import MoneyMoovApiClient from '../clients/MoneyMoovApiClient';
import { ApiError, PaymentRequest } from '../types/ApiResponses';

export const usePaymentRequests = (apiUrl: string, authToken: string, page: number, pageSize?: number) => {
  const client = new MoneyMoovApiClient(apiUrl, authToken);

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [apiError, setApiError] = useState<ApiError>();

  useEffect(() => {
    const fetchPaymentRequests = async () => {
      const response = await client.PaymentRequests.getAll(page, pageSize);

      if (response.data) {
        setPaymentRequests(response.data.content);
        setPageNumber(response.data.pageNumber);
        setTotalRecords(response.data.totalSize);
      } else if (response.error) {
        setApiError(response.error);
      }
    };

    fetchPaymentRequests();
  }, [page, apiUrl, authToken, pageSize]);

  return {
    paymentRequests,
    pageNumber,
    totalRecords,
    apiError,
  };
};
