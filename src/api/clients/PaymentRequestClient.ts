import {
  ApiError,
  PaymentRequestCreate,
  PaymentRequestMetrics,
  PaymentRequestMinimal,
  PaymentRequestPageResponse,
} from '../types/ApiResponses';
import { HttpMethod, PaymentRequestStatus } from '../types/Enums';
import { BaseApiClient } from './BaseApiClient';

/**
 * The PaymentRequestClient provides access to the methods available
 * on the MoneyMoov PaymentRequests api.
 */
export class PaymentRequestClient extends BaseApiClient {
  apiUrl: string;

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor(apiBaseUrl: string, authToken: string) {
    super(authToken);
    this.apiUrl = `${apiBaseUrl}/paymentrequests`;
  }

  /**
   * Gets a paged list of Payment Requests
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param sort Optional expression to sort the order of the payment requests. Example "Amount desc,Inserted asc".
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param status Optional. The status filter to apply to retrieve records with this status.
   * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
   */
  async getAll(
    pageNumber = 1,
    pageSize = 20,
    sort?: string,
    fromDate?: Date,
    toDate?: Date,
    status?: PaymentRequestStatus,
  ): Promise<{
    data?: PaymentRequestPageResponse;
    error?: ApiError;
  }> {
    return await this.getPagedResponse<PaymentRequestPageResponse>(
      this.apiUrl,
      pageNumber,
      pageSize,
      sort,
      fromDate,
      toDate,
      status,
    );
  }

  /**
   * Get a single Payment request
   * @param paymentRequestId The Payment Request Id
   * @returns A PaymentRequest if successful. An ApiError if not successful.
   */
  async get(paymentRequestId: string): Promise<{
    data?: PaymentRequest;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<PaymentRequest>(`${this.apiUrl}/${paymentRequestId}`, HttpMethod.GET);

    return response;
  }

  /**
   * Creates a Payment request
   * @param paymentRequest The Payment Request to create
   * @returns The newly created PaymentRequest if successful. An ApiError if not successful.
   */
  async create(paymentRequest: PaymentRequestCreate): Promise<{
    data?: PaymentRequest;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<PaymentRequest>(this.apiUrl, HttpMethod.POST, paymentRequest);

    return response;
  }

  /**
   * Get a minimal representation of the Payment request
   * @param paymentRequestId The Payment Request Id
   * @returns A PaymentRequestMinimal if successful. An ApiError if not successful.
   */
  async minimal(paymentRequestId: string): Promise<{
    data?: PaymentRequestMinimal;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<PaymentRequestMinimal>(
      `${this.apiUrl}/${paymentRequestId}/minimal`,
      HttpMethod.GET,
    );

    return response;
  }

  /**
   * Deletes a Payment Request
   * @param paymentRequestId The Payment Request Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async delete(paymentRequestId: string): Promise<{
    success?: boolean;
    error?: ApiError;
  }> {
    const response = await this.httpRequest(`${this.apiUrl}/${paymentRequestId}`, HttpMethod.DELETE);

    return !response.error ? { success: true } : { success: false, error: response.error };
  }

  /**
   * Voids a card Payment Request
   * @param paymentRequestId The Payment Request Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async voidCardPayment(paymentRequestId: string): Promise<{
    success?: boolean;
    error?: ApiError;
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${paymentRequestId}/card/voidpaymentrequest`,
      HttpMethod.POST,
    );

    return !response.error ? { success: true } : { success: false, error: response.error };
  }

  /**
   * Gets the metrics for Payment Requests
   * @param fromDate Optional. The date filter to apply to retrieve payment requests metrics after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests metrics up until this date.
   * @returns A PaymentRequestMetrics response if successful. An ApiError if not successful.
   */
  async metrics(
    fromDate?: Date,
    toDate?: Date,
  ): Promise<{
    data?: PaymentRequestMetrics;
    error?: ApiError;
  }> {
    let url = `${this.apiUrl}/metrics`;

    const filterParams = new URLSearchParams();

    if (fromDate) {
      filterParams.append('fromDate', fromDate.toUTCString());
    }

    if (toDate) {
      filterParams.append('toDate', toDate.toUTCString());
    }

    url = `${url}?${filterParams.toString()}`;

    const response = await this.httpRequest<PaymentRequestMetrics>(url, HttpMethod.GET);

    return response;
  }
}
