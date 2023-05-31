import { useEffect, useState } from 'react';
import { ApiError, UserPaymentDefaults } from '../types/ApiResponses';
import { ClientSettingsClient } from '../clients/ClientSettingsClient';

export const useUserPaymentDefaults = (apiUrl: string, authToken: string) => {
  const [userPaymentDefaults, setUserPaymentDefaults] = useState<UserPaymentDefaults>();
  const [apiError, setApiError] = useState<ApiError>();
  const [isUserPaymentDefaultsLoading, setisUserPaymentDefaultsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserPaymentDefaults = async () => {
      setisUserPaymentDefaultsLoading(true);
      const client = new ClientSettingsClient(apiUrl, authToken);
      const response = await client.getUserPaymentDefaults();

      if (response.data) {
        setUserPaymentDefaults(response.data);
      } else if (response.error) {
        setApiError(response.error);
      }
      setisUserPaymentDefaultsLoading(false);
    };

    fetchUserPaymentDefaults();
  }, [apiUrl, authToken]);

  return {
    userPaymentDefaults,
    apiError,
    isUserPaymentDefaultsLoading,
  };
};
