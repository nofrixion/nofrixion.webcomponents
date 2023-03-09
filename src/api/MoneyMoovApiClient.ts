
import { PaymentRequestPageResponse } from "./Responses/PaymentRequest";
import { ApiError } from "./types/ApiResponses";

class MoneyMoovApiClient {

    apiUrl: string;
    token: string

    /**
     * @param apiUrl The api base url
     * @param token The token
     */
    constructor(apiUrl: string, token: string){
        this.apiUrl = apiUrl;
        this.token = token;
    }

    /**
     * Gets a paged list of Payment Requests
     * @param page The first page. Default is 1
     * @param size The page size. Default is 20
     * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
     */
    getPaymentRequests = async (page: number = 1, size: number = 20): Promise<PaymentRequestPageResponse | ApiError> => {

        return await this.getPagedResponse<PaymentRequestPageResponse>(
          `${this.apiUrl}/paymentrequests`,
          this.token,
          page,
          size);
    }

    private getPagedResponse = async <T>(
        url: string, 
        token: string,
        page?: number, 
        size?: number
        ): Promise<T | ApiError> => {
    
        url = `${url}?page=${page}&size=${size}`;
            
        try{

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
                }
            });
        
            const json = await response.json();
            
            try{
    
                const returnType:T = JSON.parse(JSON.stringify(json));
                
                return returnType;
    
            } catch (error){
    
                console.log(error);
                const parsedError = JSON.parse(JSON.stringify(json));
    
                return parsedError as ApiError;
            }

        } catch(error){
            console.error(error);
            throw error;
        }
    }
}

export default MoneyMoovApiClient;