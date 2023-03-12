import { useEffect, useState } from "react";
import MoneyMoovApiClient from '../clients/MoneyMoovApiClient';
import { PaymentRequestClient } from "../clients/PaymentRequestClient";
import {  ApiError, PaymentRequest } from "../types/ApiResponses";

export const usePaymentRequests = (apiUrl: string, authToken: string, page: number, pageSize?: number) => {
    
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiError, setApiError] = useState<ApiError>();

    useEffect(() => {
      
      const fetchPaymentRequests = async () => {
        
        // TODO: Pass this in from the caller? 
        // Use PaymentRequestClient Directly
        const client = new PaymentRequestClient(apiUrl, authToken);
        const response = await client.getAll(page, pageSize);

        // Alternatively use the MoneyMoovApiClient
        // const client = new MoneyMoovApiClient(apiUrl, token);
        // const response = await client.PaymentRequests.getAll(page, pageSize);
        
        if (response.data){
          
          setPaymentRequests(response.data.content);
          setPageNumber(response.data.pageNumber);
          setTotalPages(response.data.totalPages);
        }
        else if (response.error){
          setApiError(response.error);
        }
      };

      fetchPaymentRequests();

    }, [page, apiUrl, authToken, pageSize]);
  
    return { 
      paymentRequests, 
      pageNumber, 
      totalPages,
      apiError
    };
  };
