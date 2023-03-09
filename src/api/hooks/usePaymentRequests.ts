import { useEffect, useState } from "react";
import { PaymentRequestPageResponse, PaymentRequest } from "../Responses/PaymentRequest";
import { getPaymentRequests } from '../TestClient';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiNGMzMGVjMzktYWVkMy00MmUxLWJkMTctYzM3YzUxNWI5YjFhIn0.p1ayE28r2RgxOowP3F8frNifExzX4rPPHlTEP9_iS6k

// https://localhost:44323/api/v1

export const usePaymentRequests = (apiUrl: string, token: string, page: number) => {
    
  console.log('PAGE: ' + page);
  
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  
    useEffect(() => {
      
      const fetchPaymentRequests = async () => {
        
        const response = await getPaymentRequests(apiUrl, token, page);
        
        let resp = response as PaymentRequestPageResponse;
        
        setPaymentRequests(resp.content);
      };
  
      fetchPaymentRequests();

    }, [page]);
  
    return paymentRequests;
  };
