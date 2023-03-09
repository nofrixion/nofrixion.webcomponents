import { PaymentRequestPageResponse } from "../Responses/PaymentRequest";
import { getPaymentRequests } from '../TestClient';

export const usePaymentRequests = (apiUrl: string, token: string) => {
    const [paymentRequests, setPaymentRequests] = useState<PaymentRequestPageResponse>(
      []
    );
  
    useEffect(() => {
      const fetchPaymentRequests = async () => {
        
        const response = await getPaymentRequests(apiUrl, token);
  
        setPaymentRequests(response);
      };
  
      fetchPaymentRequests();
    }, []);
  
    return {
        paymentRequests,
    };
  };
