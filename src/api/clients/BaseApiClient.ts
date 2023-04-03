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
   * @param sort Optional. The sort expression
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param status Optional. The status filter to apply to retrieve records with this status.
   * @returns A Paged response of type TResponse if successful. An ApiError if not successful.
   */
  protected async getPagedResponse<TResponse>(
    url: string,
    pageNumber = 1,
    pageSize = 20,
    sort?: string,
    fromDate?: Date,
    toDate?: Date,
    status?: string,
  ): Promise<{
    data?: TResponse;
    error?: ApiError;
  }> {
    const filterParams = new URLSearchParams();

    filterParams.append('page', pageNumber.toString());
    filterParams.append('size', pageSize.toString());

    if (sort) {
      filterParams.append('sort', sort);
    }

    if (fromDate) {
      filterParams.append('fromDate', fromDate.toUTCString());
    }

    if (toDate) {
      filterParams.append('toDate', toDate.toUTCString());
    }

    if (status) {
      filterParams.append('status', status);
    }

    url = `${url}?${filterParams.toString()}`;

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
    postData?: unknown,
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
