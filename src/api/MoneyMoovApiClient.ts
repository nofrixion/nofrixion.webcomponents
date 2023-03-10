import { deletePaymentRequest, getPaymentRequests, voidPaymentRequest } from "./PaymentRequestClient";
import { PaymentRequestPageResponse } from "./types/ApiResponses";
import { ApiError } from "./types/ApiResponses";

class MoneyMoovApiClient {
  apiUrl: string;
  token: string;

  /**
   * @param apiUrl The api base url
   * @param token The token
   */
  constructor(apiUrl: string, token: string) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  /**
   * Gets a paged list of Payment Requests
   * @param apiUrl The base api url. E.g https://api.nofrixion.com/api/v1
   * @param token The auth token.
   * @param page The first page. Default is 1
   * @param size The page size. Default is 20
   * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
   */
  getPaymentRequests = async (
    apiUrl: string,
    token: string,
    page: number = 1,
    size: number = 20
  ): Promise<{
    data?: PaymentRequestPageResponse | undefined;
    error?: ApiError | undefined;
  }> => {
    return await getPaymentRequests(apiUrl, token, page, size);
  };

  /**
   * Deletes a Payment Request
   * @param baseApiUrl The base api url. E.g https://api.nofrixion.com/api/v1
   * @param token The auth token.
   * @param paymentRequestId The Payment Request Id
   * @returns
   */
  deletePaymentRequest = async (
    baseApiUrl: string,
    token: string,
    paymentRequestId: string
  ): Promise<{
    error?: ApiError | undefined;
  }> => {
    return await deletePaymentRequest(baseApiUrl, token, paymentRequestId);
  };

  /**
   * Voids a Payment Request
   * @param baseApiUrl The base api url. E.g https://api.nofrixion.com/api/v1
   * @param token The auth token.
   * @param paymentRequestId The Payment Request Id
   * @returns
   */
  voidPaymentRequest = async (
    baseApiUrl: string,
    token: string,
    paymentRequestId: string
  ): Promise<{
    error?: ApiError | undefined;
  }> => {
    return await voidPaymentRequest(baseApiUrl, token, paymentRequestId);
  };
}

export default MoneyMoovApiClient;
