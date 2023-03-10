import { ApiError, PaymentRequestCreate, PaymentRequestMinimal, PaymentRequestPageResponse } from '../types/ApiResponses';
import { HttpMethod } from '../types/Enums';
import { BaseApiClient } from "./BaseApiClient";

/**
 * The PaymentRequestClient provides access to the methods available
 * on the MoneyMoov PaymentRequests api.
 */
export class PaymentRequestClient extends BaseApiClient{

    apiBaseUrl: string;

    /**
     * @param apiBaseUrl The base api url.
     * Production: https://api.nofrixion.com/api/v1
     * Sandbox: https://api-sandbox.nofrixion.com/api/v1
     * @param authToken The OAUTH token used to authenticate with the api.
     */
    constructor(apiBaseUrl: string, authToken: string){

        super(authToken);
        this.apiBaseUrl = apiBaseUrl;
    }

    /**
     * Gets a paged list of Payment Requests
     * @param pageNumber The first page to fetch for the paged response. Default is 1
     * @param pageSize The page size. Default is 20
     * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
     */
    async getAll(pageNumber: number = 1, pageSize: number = 20) : Promise<{
        data?: PaymentRequestPageResponse;
        error?: ApiError}> {

        return await this.getPagedResponse<PaymentRequestPageResponse>(
            `${this.apiBaseUrl}/paymentrequests`,
            pageNumber,
            pageSize);
    }

    /**
     * Get a single Payment request
     * @param paymentRequestId The Payment Request Id 
     * @returns A PaymentRequest if successful. An ApiError if not successful.
     */
    async get(paymentRequestId: string) : Promise<{
        data?: PaymentRequest;
        error?: ApiError}> {

        let response = await this.httpRequest<PaymentRequest>(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}`,
            HttpMethod.GET
        );

        return response;
    }

    /**
     * Creates a Payment request
     * @param paymentRequest The Payment Request to create 
     * @returns The newly created PaymentRequest if successful. An ApiError if not successful.
     */
    async create(paymentRequest: PaymentRequestCreate) : Promise<{
        data?: PaymentRequest;
        error?: ApiError}> {

        let response = await this.httpRequest<PaymentRequest>(
            `${this.apiBaseUrl}/paymentrequests`,
            HttpMethod.POST,
            paymentRequest
        );

        return response;
    }

    /**
     * Get a minimal representation of the Payment request
     * @param paymentRequestId The Payment Request Id 
     * @returns A PaymentRequestMinimal if successful. An ApiError if not successful.
     */
    async minimal(paymentRequestId: string) : Promise<{
        data?: PaymentRequestMinimal;
        error?: ApiError}> {

        let response = await this.httpRequest<PaymentRequestMinimal>(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}/minimal`,
            HttpMethod.GET
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
        error?: ApiError}> {
    
        let response = await this.httpRequest(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}`,
            HttpMethod.DELETE
        );

        return !response.error ? { success: true } : { success: false, error: response.error };
    }

    /**
     * Voids a card Payment Request
     * @param paymentRequestId The Payment Request Id
     * @returns True if successfull. An ApiError if not successful.
     */
    async voidCardPayment(paymentRequestId: string): Promise<{
        success?: boolean;
        error?: ApiError}> {
    
        let response = await this.httpRequest(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}/card/voidpaymentrequest`,
            HttpMethod.POST
        );

        return !response.error ? { success: true } : { success: false, error: response.error };
    }
}