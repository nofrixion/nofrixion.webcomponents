import { PaymentRequestPageResponse } from "./Responses/PaymentRequest";
import { ApiError } from "./types/ApiResponses";

export const getPaymentRequests = async (
    apiUrl: string,
    token: string,
    page: number = 1, 
    size: number = 20): Promise<PaymentRequestPageResponse | ApiError> => {

    return await getPagedResponse<PaymentRequestPageResponse>(
      `${apiUrl}/paymentrequests`,
      token,
      page,
      size);
}

const getPagedResponse = async <T>(
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

            const returnType:T = json as T;
            
            return returnType;

        } catch (error){

            console.log(error);
            const parsedError = json as ApiError;

            return parsedError;
        }

    } catch(error){
        console.error(error);
        throw error;
    }
};