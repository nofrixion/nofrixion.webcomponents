import axios, { AxiosError } from 'axios';
import { ApiError } from '../types/ApiResponses';
import { HttpMethod } from '../types/Enums';

export abstract class BaseApiClient {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  /**
   * Gets a paged response from supporting api endpoints
   * @param url The api url
   * @param pageNumber The page number
   * @param pageSize The page size
   * @returns A Paged response of type TResponse if successful. An ApiError if not successful.
   */
  protected async getPagedResponse<TResponse>(
    url: string,
    pageNumber = 1,
    pageSize = 20,
    sort?: string,
  ): Promise<{
    data?: TResponse;
    error?: ApiError;
  }> {
    url = `${url}?page=${pageNumber}&size=${pageSize}`;

    if (sort) {
      url = `${url}&sort=${sort}`;
    }

    return await this.httpRequest<TResponse>(url, HttpMethod.GET);
  }

  /**
   * Performs a http request to the MoneyMoov api.
   * @param url The request url
   * @param method The Http Method.
   * @param postData Optional. The data to post if specified.
   * @returns A response of type TResponse if successful. An ApiError if not successful.
   */
  protected async httpRequest<TResponse>(
    url: string,
    method: HttpMethod,
    postData?: any,
  ): Promise<{
    data?: TResponse;
    error?: ApiError;
  }> {
    console.log(`Requesting: ${method} ${url}`);

    let contentType = 'application/json';

    // Send form encoding on POST and PUT
    // Axios will automatically serialize the postData object to form urlencoded format
    if (method === HttpMethod.POST || method === HttpMethod.PUT) {
      contentType = 'application/x-www-form-urlencoded';
    }

    try {
      const { data } = await axios<TResponse>({
        method: method,
        url: url,
        data: postData,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          'content-type': contentType,
        },
      });

      return {
        data: data,
      };
    } catch (ex) {
      // Axios will throw an exception for all errors

      const error = ex as AxiosError;

      if (error.response?.data) {
        // This contains the problem details
        console.log('Received error from api. : ' + JSON.stringify(error.response?.data));

        return {
          error: error.response?.data as ApiError,
        };
      }

      return {
        error: {
          type: error.code,
          title: 'MoneyMoov Api Error.',
          status: error.status,
          detail: error.message,
        },
      };
    }
  }
}
