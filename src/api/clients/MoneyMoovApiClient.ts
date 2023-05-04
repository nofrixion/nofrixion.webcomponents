import { ClientSettingsClient } from './ClientSettingsClient';
import { PaymentRequestClient } from './PaymentRequestClient';

/**
 * The MoneyMoov Api Client provides access to the api endpoints in the MoneyMoov api.
 * Available apis are:
 * PaymentRequests
 */
class MoneyMoovApiClient {
  apiBaseUrl: string;
  authToken: string;

  /**
   * Provides access to the MoneyMoov PaymentRequests api.
   */
  PaymentRequests: PaymentRequestClient;

  /**
   * Provides access to the MoneyMoov ClientSettings api.
   */
  ClientSettings: ClientSettingsClient;

  /**
   *
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param merchantId The merchant id to use when accessing the api.
   */
  constructor(apiBaseUrl: string, authToken: string, merchantId: string) {
    this.apiBaseUrl = apiBaseUrl;
    this.authToken = authToken;

    this.PaymentRequests = new PaymentRequestClient(apiBaseUrl, authToken, merchantId);
    this.ClientSettings = new ClientSettingsClient(apiBaseUrl, authToken);
  }
}

export default MoneyMoovApiClient;
