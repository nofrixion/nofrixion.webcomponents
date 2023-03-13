import axios, { AxiosError } from "axios";
import { ApiError } from "../types/ApiResponses";

export abstract class BaseApiClient{

    authToken: string;

    constructor(authToken: string){
        
        this.authToken = authToken;
    }

    /**
     * Gets a paged response from supporting api endpoints
     * @param url The api url
     * @param pageNumber The page number
     * @param pageSize The page size
     * @returns A Paged response of type T if successful. An ApiError if not successful.
     */
    protected async getPagedResponse<T>(
        url: string, 
        pageNumber: number = 1, 
        pageSize: number = 20
        ): Promise<{
            data?: T;
            error?: ApiError
        }> 
    {
        url = `${url}?page=${pageNumber}&size=${pageSize}`;
        
        return await this.fetchWithHandleError<T>(url, 'GET');
    };

    protected async fetchWithHandleError<T>(
        url: string,
        method: string
        ): Promise<{
            data?: T;
            error?: ApiError
        }> {

            console.log('Requesting: ' + url);

            try{
        
                const { data } = await axios<T>({
                    method: method,
                    url: url,
                    headers: {
                        'Authorization': `Bearer ${this.authToken}`
                    },
                  });

                return {
                    data: data,
                };
        
            } catch (ex) {
        
                // Axios will throw an exception for all errors
                
                const error = ex as AxiosError;
                
                if (error.response?.data){
                    // This contains the problem details
                    console.log('Received error from api. : ' + JSON.stringify(error.response?.data));
                    
                    return {
                        error: error.response?.data as ApiError
                    };
                }
                
                return { error: {
                    type: error.code,
                    title: 'MoneyMoov Api Error.',
                    status: error.status,
                    detail: error.message
                }};
            }
        }
}