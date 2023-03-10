import { PaymentRequestPageResponse } from "./types/ApiResponses";
import { ApiError } from "./types/ApiResponses";
import { getPagedResponse, fetchWithHandleError } from "./ApiClient";

/**
 * Gets a paged list of Payment Requests
 * @param baseApiUrl The base api url. E.g https://api.nofrixion.com/api/v1
 * @param token The auth token.
 * @param page The first page. Default is 1
 * @param pageSize The page size. Default is 20
 * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
 */
export const getPaymentRequests = async (
    baseApiUrl: string,
    token: string,
    page: number = 1, 
    pageSize: number = 20): Promise<{
        data?: PaymentRequestPageResponse | undefined;
        error?: ApiError | undefined
    }> => {

    return await getPagedResponse<PaymentRequestPageResponse>(
      `${baseApiUrl}/paymentrequests`,
      token,
      page,
      pageSize);
};

/**
 * Deletes a Payment Request
 * @param baseApiUrl The base api url. E.g https://api.nofrixion.com/api/v1
 * @param token The auth token.
 * @param paymentRequestId The Payment Request Id
 * @returns 
 */
export const deletePaymentRequest = async (baseApiUrl: string,
    token: string,
    paymentRequestId: string): Promise<{
        error?: ApiError | undefined
    }> => {

        return await fetchWithHandleError(
            `${baseApiUrl}/paymentrequests/${paymentRequestId}`,
            token,
            "DELETE"
        );
};

/**
 * Voids a Payment Request
 * @param baseApiUrl The base api url. E.g https://api.nofrixion.com/api/v1
 * @param token The auth token.
 * @param paymentRequestId The Payment Request Id
 * @returns 
 */
export const voidPaymentRequest = async (baseApiUrl: string,
    token: string,
    paymentRequestId: string): Promise<{
        error?: ApiError | undefined
    }> => {

        return await fetchWithHandleError(
            `${baseApiUrl}/paymentrequests/${paymentRequestId}/card/voidpaymentrequest`,
            token,
            "POST"
        );
};