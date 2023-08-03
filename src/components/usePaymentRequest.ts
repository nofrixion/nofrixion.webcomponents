import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiProps,
  ApiResponse,
  MerchantProps,
  PaymentRequest,
  PaymentRequestClient,
  PaymentRequestPageResponse,
  PaymentRequestProps,
} from '@nofrixion/moneymoov';
export interface usePaymentRequestProps extends MerchantProps, PaymentRequestProps {
  merchantId: string;
  paymentRequestsQueryKey: any[];
}
const fetchPaymentRequest = async (
  apiUrl: string,
  paymentRequestId?: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<PaymentRequest>> => {
  const client = new PaymentRequestClient({ apiUrl, authToken });
  const includeEvents = true;
  const response = await client.get({ paymentRequestId, includeEvents, merchantId });

  return response;
};

export const usePaymentRequest = (
  { paymentRequestId, merchantId, paymentRequestsQueryKey }: usePaymentRequestProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['PaymentRequest', merchantId, paymentRequestId, apiUrl, authToken];

  return useQuery<ApiResponse<PaymentRequest>, Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchPaymentRequest(apiUrl, paymentRequestId, merchantId, authToken),
    enabled: !!paymentRequestId && !!merchantId,
    placeholderData: () => {
      if (paymentRequestId) {
        const result = queryClient.getQueryData<ApiResponse<PaymentRequestPageResponse>>(paymentRequestsQueryKey);

        if (result?.status === 'success') {
          const paymentRequest: PaymentRequest = result.data.content.find((x) => x.id === paymentRequestId)!;
          console.log('remote1', paymentRequest);
          const apiresponse: ApiResponse<PaymentRequest> = {
            data: paymentRequest,
            status: 'success',
            timestamp: new Date(),
          };
          return apiresponse;
        }
      }
    },
  });
};
