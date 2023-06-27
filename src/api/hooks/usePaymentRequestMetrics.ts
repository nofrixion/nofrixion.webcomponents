import { useEffect, useState } from 'react';
import { PaymentRequestClient } from '../clients/PaymentRequestClient';
import { ApiError, PaymentRequestMetrics } from '../types/ApiResponses';

export const usePaymentRequestMetrics = (
  apiUrl: string,
  authToken: string,
  merchantId: string,
  onUnauthorized: () => void,
  fromDateMs?: number,
  toDateMs?: number,
) => {
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>();
  const [apiError, setApiError] = useState<ApiError>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentRequestMetrics = async () => {
      setIsLoading(true);
      const client = new PaymentRequestClient(apiUrl, authToken, merchantId, onUnauthorized);
      const response = await client.metrics(new Date(fromDateMs ?? 0), new Date(toDateMs ?? 0));

      if (response.data) {
        setMetrics(response.data);
      } else if (response.error) {
        setApiError(response.error);
      }
      setIsLoading(false);
    };

    fetchPaymentRequestMetrics();
  }, [apiUrl, authToken, merchantId, fromDateMs, toDateMs]);

  return {
    metrics,
    apiError,
    isLoading,
  };
};
