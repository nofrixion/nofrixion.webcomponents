import { useEffect, useState } from "react";
import { PaymentRequestPageResponse, PaymentRequest } from "../types/ApiResponses";
import { getPaymentRequests } from '../PaymentRequestClient';

export const usePaymentRequests = (apiUrl: string, token: string, page: number, pageSize?: number) => {
    
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      
      const fetchPaymentRequests = async () => {
        
        const response = await getPaymentRequests(apiUrl, token, page, pageSize);
        
        if (!response.error){
          
          let resp = response.data as PaymentRequestPageResponse;
        
          setPaymentRequests(resp.content);
          setPageNumber(resp.pageNumber);
          setTotalPages(resp.totalPages);
        }
      };

      fetchPaymentRequests();

    }, [page, apiUrl, token, pageSize]);
  
    return { 
      paymentRequests, 
      pageNumber, 
      totalPages 
    };
  };
