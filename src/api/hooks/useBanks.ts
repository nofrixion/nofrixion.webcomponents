import { useEffect, useState } from 'react';
import { MerchantClient } from '../clients/MerchantClient';
import { ApiError, BankSettings } from '../types/ApiResponses';

export const useBanks = (apiUrl: string, authToken: string, merchantId: string) => {
  const [banks, setBanks] = useState<BankSettings[]>();
  const [apiError, setApiError] = useState<ApiError>();

  useEffect(() => {
    const fetchBanks = async () => {
      const client = new MerchantClient(apiUrl, authToken, merchantId);
      const response = await client.getBankSettings();

      if (response.data) {
        setBanks(response.data.payByBankSettings);
      } else if (response.error) {
        setApiError(response.error);
      }
    };

    fetchBanks();
  }, [apiUrl, authToken, merchantId]);

  return {
    banks,
    apiError,
  };
};
