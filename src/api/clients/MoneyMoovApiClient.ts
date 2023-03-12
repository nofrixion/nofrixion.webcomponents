import { PaymentRequestClient } from "./PaymentRequestClient";

/**
 * The MoneyMoov Api Client provides access to the api endpoints in the MoneyMoov api.
 * Available apis are:
 * PaymentRequests
 */
class MoneyMoovApiClient {
  apiBaseUrl: string;
  authToken: string;

  /**
   * Provides access to PaymentRequest api.
   */
  PaymentRequests: PaymentRequestClient;
  
  /**
   * 
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor(apiBaseUrl: string, authToken: string) {
    this.apiBaseUrl = apiBaseUrl;
    this.authToken = authToken;

    this.PaymentRequests = new PaymentRequestClient(apiBaseUrl, authToken);
  }
}

export default MoneyMoovApiClient;
