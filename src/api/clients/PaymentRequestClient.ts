import { ApiError, PaymentRequestMinimal, PaymentRequestPageResponse } from '../types/ApiResponses';
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
    getAll = async (pageNumber: number = 1, pageSize: number = 20) : Promise<{
        data?: PaymentRequestPageResponse;
        error?: ApiError}> => {

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
    get = async (paymentRequestId: string) : Promise<{
        data?: PaymentRequest;
        error?: ApiError}> => {

        let response = await this.fetchWithHandleError<PaymentRequest>(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}`,
            "GET"
        );

        return response;
    }

    /**
     * Get a minimal representation of the Payment request
     * @param paymentRequestId The Payment Request Id 
     * @returns A PaymentRequestMinimal if successful. An ApiError if not successful.
     */
    minimal = async (paymentRequestId: string) : Promise<{
        data?: PaymentRequestMinimal;
        error?: ApiError}> => {

        let response = await this.fetchWithHandleError<PaymentRequestMinimal>(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}/minimal`,
            "GET"
        );

        return response;
    }

    /**
     * Deletes a Payment Request
     * @param paymentRequestId The Payment Request Id
     * @returns True if successfull. An ApiError if not successful.
     */
    delete = async (paymentRequestId: string): Promise<{
        success?: boolean;
        error?: ApiError}> => {
    
        let response = await this.fetchWithHandleError(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}`,
            "DELETE"
        );

        return !response.error ? { success: true } : { success: false, error: response.error };
    }

    /**
     * Voids a card Payment Request
     * @param paymentRequestId The Payment Request Id
     * @returns True if successfull. An ApiError if not successful.
     */
    voidCardPayment = async (paymentRequestId: string): Promise<{
        success?: boolean;
        error?: ApiError}> => {
    
        let response = await this.fetchWithHandleError(
            `${this.apiBaseUrl}/paymentrequests/${paymentRequestId}/card/voidpaymentrequest`,
            "POST"
        );

        return !response.error ? { success: true } : { success: false, error: response.error };
    }
}