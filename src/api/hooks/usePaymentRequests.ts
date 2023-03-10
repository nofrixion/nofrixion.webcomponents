import { useEffect, useState } from "react";
import { PaymentRequestPageResponse, PaymentRequest } from "../Responses/PaymentRequest";
import { getPaymentRequests } from '../Client';

export const usePaymentRequests = (apiUrl: string, token: string, page: number) => {
    
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      
      const fetchPaymentRequests = async () => {
        
        const response = await getPaymentRequests(apiUrl, token, page);
        
        // TODO: Handle errors
        let resp = response as PaymentRequestPageResponse;
        
        setPaymentRequests(resp.content);
        setPageNumber(resp.pageNumber);
        setTotalPages(resp.totalPages);
      };

      fetchPaymentRequests();

    }, [page, apiUrl, token]);
  
    return { 
      paymentRequests, 
      pageNumber, 
      totalPages 
    };
  };
