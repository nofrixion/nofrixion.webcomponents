import { useEffect, useState } from 'react';
import { MerchantClient } from '../clients/MerchantClient';
import { ApiError, Tag } from '../types/ApiResponses';

export const useMerchantTags = (authToken: string, merchantId: string, apiUrl?: string) => {
  const [tags, setTags] = useState<Tag[]>();
  const [apiError, setApiError] = useState<ApiError>();

  useEffect(() => {
    if (apiUrl) {
      const fetchMerchantTags = async () => {
        const client = new MerchantClient(apiUrl, authToken, merchantId);
        const response = await client.getTags();

        if (response.data) {
          setTags(response.data);
        } else if (response.error) {
          setApiError(response.error);
        }
      };
      fetchMerchantTags();
    }
  }, [apiUrl, authToken, merchantId]);

  return {
    tags,
    apiError,
  };
};
