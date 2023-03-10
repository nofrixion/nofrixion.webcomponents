import { ApiError } from "./types/ApiResponses";

export const getPagedResponse = async <T>(
    url: string, 
    token: string,
    page?: number, 
    size?: number
    ): Promise<{
        data?: T | undefined;
        error?: ApiError | undefined
    }> => {

    url = `${url}?page=${page}&size=${size}`;
    
    let response = await fetchWithHandleError(url, token, 'GET');

    if (!response.error){

        const returnType:T = response.data as T;
            
        return { 
            data: returnType 
        };
    }
    else{
        return { 
            error: response.error 
        };
    }
};

export const fetchWithHandleError = async (
    url: string, 
    token: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    ): Promise<{
        data?: string | undefined;
        error?: ApiError | undefined
    }> => {

    try{

        const response = await fetch(url, {
            method: method,
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        });
    
        let json: string | any;

        try{
            json = await response.json();
        }
        catch{}
        
        if (response?.ok){
        
            return {
                data: json
            };
        }
        else{
            
            const parsedError = json as ApiError;
            
            console.log(json);

            return {
                error: parsedError
            };
        }
        
    } catch(error){
        console.error(error);
        throw error;
    }
};