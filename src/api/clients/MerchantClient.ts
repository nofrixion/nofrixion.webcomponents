import { ApiError, MerchantBankSettings } from '../types/ApiResponses';
import { HttpMethod } from '../types/Enums';
import { BaseApiClient } from './BaseApiClient';

/**
 * The MerchantClient provides access to the methods available
 * on the MoneyMoov Merchant API.
 */
export class MerchantClient extends BaseApiClient {
  apiUrl: string;
  merchantId: string;

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor(apiBaseUrl: string, authToken: string, merchantId: string) {
    super(authToken);
    this.merchantId = merchantId;
    this.apiUrl = `${apiBaseUrl}/merchants/${merchantId}`;
  }

  /**
   * Gets the bank settings of the merchant
   * @returns A MerchantBankSettings if successful. An ApiError if not successful.
   */
  async getBankSettings(): Promise<{
    data?: MerchantBankSettings;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<MerchantBankSettings>(`${this.apiUrl}/banksettings`, HttpMethod.GET);

    return response;
  }
}
