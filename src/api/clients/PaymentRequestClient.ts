import {
  ApiError,
  PaymentRequestCreate,
  PaymentRequestMetrics,
  PaymentRequestMinimal,
  PaymentRequestPageResponse,
  PaymentRequest,
  PaymentRequestUpdate,
} from '../types/ApiResponses';
import { HttpMethod, PaymentRequestStatus } from '../types/Enums';
import { BaseApiClient } from './BaseApiClient';

/**
 * The PaymentRequestClient provides access to the methods available
 * on the MoneyMoov PaymentRequests api.
 */
export class PaymentRequestClient extends BaseApiClient {
  apiUrl: string;
  merchantId: string;

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param merchantId The merchant id to use when accessing the api.
   */
  constructor(apiBaseUrl: string, authToken: string, merchantId: string, onUnauthorized: () => void) {
    super(authToken, onUnauthorized);
    this.apiUrl = `${apiBaseUrl}/paymentrequests`;
    this.merchantId = merchantId;
  }

  /**
   * Gets a paged list of Payment Requests
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param sort Optional expression to sort the order of the payment requests. Example "Amount desc,Inserted asc".
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param status Optional. The status filter to apply to retrieve records with this status.
   * @param search Optional. The search filter to apply to retrieve records with this search text in the description, title, merchant name or contact name.
   * @param currency Optional. The currency filter to apply to retrieve records with this currency.
   * @param minAmount Optional. The minimum amount filter to apply to retrieve records with this minimum amount.
   * @param maxAmount Optional. The maximum amount filter to apply to retrieve records with this maximum amount.
   * @param tags Optional. The tags filter to apply to retrieve records with these tags.
   * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
   */
  async getAll(
    pageNumber = 1,
    pageSize = 20,
    sort?: string,
    fromDate?: Date,
    toDate?: Date,
    status?: PaymentRequestStatus,
    search?: string,
    currency?: string,
    minAmount?: number,
    maxAmount?: number,
    tags?: string[],
  ): Promise<{
    data?: PaymentRequestPageResponse;
    error?: ApiError;
  }> {
    return await this.getPagedResponse<PaymentRequestPageResponse>(
      this.apiUrl,
      this.merchantId,
      pageNumber,
      pageSize,
      sort,
      fromDate,
      toDate,
      status,
      search,
      currency,
      minAmount,
      maxAmount,
      tags,
    );
  }

  /**
   * Get a single Payment request
   * @param paymentRequestId The Payment Request Id
   * @param includeEvents Optional. Include the events for the Payment Request. Default is false.
   * @returns A PaymentRequest if successful. An ApiError if not successful.
   */
  async get(
    paymentRequestId: string,
    includeEvents = false,
  ): Promise<{
    data?: PaymentRequest;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<PaymentRequest>(
      `${this.apiUrl}/${paymentRequestId}?includeEvents=${includeEvents}`,
      HttpMethod.GET,
    );

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
   * Updates a Payment request
   * @param paymentRequestId The ID of the Payment Request to update.
   * @param paymentRequestUpdate The Payment Request update object with the updated values.
   * @returns The updated PaymentRequest if successful. An ApiError if not successful.
   */
  async update(
    paymentRequestId: string,
    paymentRequestUpdate: PaymentRequestUpdate,
  ): Promise<{
    data?: PaymentRequest;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<PaymentRequest>(
      `${this.apiUrl}/${paymentRequestId}`,
      HttpMethod.PUT,
      paymentRequestUpdate,
    );

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
  async voidAllCardPayments(paymentRequestId: string): Promise<{
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
   * Voids a card Payment Request
   * @param paymentRequestId The Payment Request Id
   * @param authorizationID The authorization ID of the card payment to void.
   * @returns True if successfull. An ApiError if not successful.
   */
  async voidCardPayment(
    paymentRequestId: string,
    authorizationID: string,
  ): Promise<{
    success?: boolean;
    error?: ApiError;
  }> {
    const response = await this.httpRequest(`${this.apiUrl}/${paymentRequestId}/card/void`, HttpMethod.POST, {
      authorizationID,
    });

    return !response.error ? { success: true } : { success: false, error: response.error };
  }

  /**
   * Gets the metrics for Payment Requests
   * @param fromDate Optional. The date filter to apply to retrieve payment requests metrics after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests metrics up until this date.
   * @param search Optional. The search filter to apply to retrieve payment request metrics with this search text in the description, title, merchant name or contact name.
   * @param currency Optional. The currency filter to apply to retrieve payment request metrics with this currency.
   * @param minAmount Optional. The minimum amount filter to apply to retrieve payment request metrics with this minimum amount.
   * @param maxAmount Optional. The maximum amount filter to apply to retrieve payment request metrics with this maximum amount.
   * @param tags Optional. The tags filter to apply to retrieve payment request metrics with these tags.
   * @returns A PaymentRequestMetrics response if successful. An ApiError if not successful.
   */
  async metrics(
    fromDate?: Date,
    toDate?: Date,
    search?: string,
    currency?: string,
    minAmount?: number,
    maxAmount?: number,
    tags?: string[],
  ): Promise<{
    data?: PaymentRequestMetrics;
    error?: ApiError;
  }> {
    let url = `${this.apiUrl}/metrics`;

    const filterParams = new URLSearchParams();

    filterParams.append('merchantID', this.merchantId);

    if (fromDate) {
      filterParams.append('fromDate', fromDate.toUTCString());
    }

    if (toDate) {
      filterParams.append('toDate', toDate.toUTCString());
    }

    if (search) {
      filterParams.append('search', search);
    }

    if (currency) {
      filterParams.append('currency', currency);
    }

    if (minAmount) {
      filterParams.append('minAmount', minAmount.toString());
    }

    if (maxAmount) {
      filterParams.append('maxAmount', maxAmount.toString());
    }

    if (tags) {
      tags.forEach((tag) => filterParams.append('tags', tag));
    }

    url = `${url}?${filterParams.toString()}`;

    const response = await this.httpRequest<PaymentRequestMetrics>(url, HttpMethod.GET);

    return response;
  }
}
