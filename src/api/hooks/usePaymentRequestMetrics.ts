import { useEffect, useState } from 'react';
import { PaymentRequestClient } from '../clients/PaymentRequestClient';
import { ApiError, PaymentRequestMetrics } from '../types/ApiResponses';

export const usePaymentRequestMetrics = (apiUrl: string, authToken: string) => {
  const [paymentRequestMetrics, setPaymentRequestMetrics] = useState<PaymentRequestMetrics>();
  const [apiError, setApiError] = useState<ApiError>();
  const [totalRecords, setTotalRecords] = useState(1);

  useEffect(() => {
    const fetchPaymentRequestMetrics = async () => {
      const client = new PaymentRequestClient(apiUrl, authToken);
      const response = await client.metrics();

      if (response.data) {
        setPaymentRequestMetrics(response.data);
        setTotalRecords(response.data.all + response.data.paid + response.data.unpaid + response.data.partiallyPaid);
      } else if (response.error) {
        setApiError(response.error);
      }
    };

    fetchPaymentRequestMetrics();
  }, [apiUrl, authToken, totalRecords]);

  return {
    paymentRequestMetrics,
    totalRecords,
    apiError,
  };
};
