import { useCallback, useState } from 'react';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, ApiProps, PaymentRequestClient, RefundProps, usePaymentRequestsProps } from '@nofrixion/moneymoov';

const refund = async (
  apiUrl: string,
  authorizationId: string,
  paymentRequestId: string,
  authToken?: string,
  amount?: number,
): Promise<{
  success?: boolean;
  error?: ApiError;
}> => {
  const client = new PaymentRequestClient({ apiUrl, authToken });
  const response = await client.refundCardPayment(paymentRequestId, authorizationId, amount);

  return response;
};

export const useRefund = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  }: usePaymentRequestsProps,
  { apiUrl, authToken }: ApiProps,
): {
  processRefund: (refundProps: RefundProps) => Promise<{ error: ApiError | undefined }>;
} => {
  const queryClient = useQueryClient();

  const [paymentRequestID, setPaymentRequestID] = useState<string>();

  const paymentRequestsQueryKey = ['PaymentRequest', merchantId, paymentRequestID, apiUrl, authToken];

  const QUERY_KEY = [
    'PaymentRequests',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  ];

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    RefundProps
  > = useMutation({
    mutationFn: (variables: RefundProps) =>
      refund(apiUrl, variables.authorizationId, variables.paymentRequestId, authToken, variables.amount),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: paymentRequestsQueryKey });
      }
    },
  });

  const processRefund = useCallback(
    async ({ authorizationId, paymentRequestId, amount }: RefundProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId);
        const result = await mutation.mutateAsync({
          authorizationId,
          paymentRequestId,
          amount,
        });

        if (result.success) {
          return { error: undefined };
        } else {
          return { error: result.error };
        }
      }
      return { error: undefined };
    },
    [mutation],
  );

  return { processRefund };
};
