import { ApiError, MerchantBankSettings, Tag } from '../types/ApiResponses';
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
  constructor(apiBaseUrl: string, authToken: string, merchantId: string, onUnauthorized: () => void) {
    super(authToken, onUnauthorized);
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

  /**
   * Gets the tags for the merchant
   * @returns A list of tags if successful. An ApiError if not successful.
   */
  async getTags(): Promise<{
    data?: Tag[];
    error?: ApiError;
  }> {
    const response = await this.httpRequest<Tag[]>(`${this.apiUrl}/tags`, HttpMethod.GET);

    return response;
  }

  /**
   * Adds a tag to the merchant
   * @param tag The tag to add
   * @returns True if successfull. An ApiError if not successful.
   */
  async addTag(tag: Tag): Promise<{
    data?: Tag;
    error?: ApiError;
  }> {
    const response = await this.httpRequest<Tag>(`${this.apiUrl}/tags`, HttpMethod.POST, tag);

    return response;
  }

  /**
   * Deletes a Tag
   * @param tagId The Tag Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async deleteTag(tagId: string): Promise<{
    success?: boolean;
    error?: ApiError;
  }> {
    const response = await this.httpRequest(`${this.apiUrl}/tags/${tagId}`, HttpMethod.DELETE);

    return !response.error ? { success: true } : { success: false, error: response.error };
  }
}
