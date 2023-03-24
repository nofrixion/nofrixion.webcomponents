import { useEffect, useState } from 'react';
import { PaymentRequestClient } from '../clients/PaymentRequestClient';
import { ApiError } from '../types/ApiResponses';

export const useDeletePaymentRequest = (apiUrl: string, authToken: string) => {
  const [apiError, setApiError] = useState<ApiError>();

  const deletePaymentRequest = async (paymentRequestId: string) => {
    const client = new PaymentRequestClient(apiUrl, authToken);
    const response = await client.delete(paymentRequestId);

    if (response.error) {
      setApiError(response.error);
      return response.error;
    }
  };

  return {
    deletePaymentRequest,
    apiError,
  };
};
