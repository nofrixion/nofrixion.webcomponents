import { useEffect, useState } from 'react';
import { PaymentRequestClient } from '../clients/PaymentRequestClient';
import { ApiError, PaymentRequestMetrics } from '../types/ApiResponses';

export const usePaymentRequestMetrics = (apiUrl: string, authToken: string, fromDate?: Date, toDate?: Date) => {
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>();
  const [apiError, setApiError] = useState<ApiError>();

  useEffect(() => {
    const fetchPaymentRequestMetrics = async () => {
      const client = new PaymentRequestClient(apiUrl, authToken);
      const response = await client.metrics(fromDate, toDate);

      if (response.data) {
        setMetrics(response.data);
      } else if (response.error) {
        setApiError(response.error);
      }
    };

    fetchPaymentRequestMetrics();
  }, [apiUrl, authToken, fromDate, toDate]);

  return {
    metrics,
    apiError,
  };
};
