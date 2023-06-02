import { useEffect, useState } from 'react';
import { useMerchantTags } from '../../../api/hooks/useMerchantTags';
import UIPaymentRequestDetailsModal from '../../ui/PaymentRequestDetailsModal/PaymentRequestDetailsModal';
import { RemotePaymentRequestToLocalPaymentRequest, parseApiTagToLocalTag } from '../../../utils/parsers';
import { LocalTag } from '../../../types/LocalTypes';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { PaymentRequest, PaymentRequestUpdate } from '../../../api/types/ApiResponses';
import { MerchantClient } from '../../../api/clients/MerchantClient';

interface PaymentRequestDetailsModalProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl: string; // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string;
  paymentRequestID: string;
  open: boolean;
  onDismiss: () => void;
}
const PaymentRequestDetailsModal = ({
  token,
  apiUrl,
  merchantId,
  paymentRequestID,
  open,
  onDismiss,
}: PaymentRequestDetailsModalProps) => {
  const paymentRequestClient = new PaymentRequestClient(apiUrl, token, merchantId);
  const merchantClient = new MerchantClient(apiUrl, token, merchantId);
  const merchantTags = useMerchantTags(token, merchantId, apiUrl);
  const [localMerchantTags, setLocalMerchantTags] = useState<LocalTag[]>([] as LocalTag[]);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | undefined>();

  const onRefundClick = async (paymentAttemptID: string) => {
    //TODO: Will implement refund for atleast card payment attempts. For PISP, it will need to be worked on later.
    console.log(paymentAttemptID);
  };

  const onTagAdded = async (tag: LocalTag) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? [];
      const paymentRequestUpdate: PaymentRequestUpdate = {
        tagIds: existingTagIds.concat(tag.id),
      };
      const paymentRequestTagAdd = await paymentRequestClient.update(paymentRequest.id, paymentRequestUpdate);
      if (paymentRequestTagAdd.error) {
        console.log(paymentRequestTagAdd.error);
      } else {
        setPaymentRequest(paymentRequestTagAdd.data);
      }
    }
  };

  const onTagCreated = async (tag: LocalTag) => {
    if (paymentRequest) {
      const response = await merchantClient.addTag(parseApiTagToLocalTag(tag));
      if (response.error) {
        console.log(response.error);
      } else {
        const createdTag = response.data;
        if (createdTag) {
          const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? [];
          const paymentRequestUpdate: PaymentRequestUpdate = {
            tagIds: existingTagIds.concat(createdTag.id),
          };
          const paymentRequestTagAdd = await paymentRequestClient.update(paymentRequest.id, paymentRequestUpdate);
          if (paymentRequestTagAdd.error) {
            console.log(paymentRequestTagAdd.error);
          } else {
            setPaymentRequest(paymentRequestTagAdd.data);
          }
        }
      }
    }
  };

  const onTagDeleted = async (tagIdToDelete: string) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? [];
      const paymentRequestUpdate: PaymentRequestUpdate = {
        tagIds: existingTagIds.filter((id) => id !== tagIdToDelete),
      };
      const paymentRequestTagDelete = await paymentRequestClient.update(paymentRequest.id, paymentRequestUpdate);
      if (paymentRequestTagDelete.error) {
        console.log(paymentRequestTagDelete.error);
      } else {
        setPaymentRequest(paymentRequestTagDelete.data);
      }
    }
  };

  useEffect(() => {
    if (merchantTags.tags) {
      setLocalMerchantTags(merchantTags.tags.map((tag) => parseApiTagToLocalTag(tag)));
    }
  }, [merchantTags.tags]);

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const response = await paymentRequestClient.get(paymentRequestID, true);
      if (response.error) {
        return;
      }
      if (response.data) {
        setPaymentRequest(response.data);
      }
    };
    fetchPaymentRequest();
  }, [apiUrl, token, merchantId]);

  return (
    <div>
      {paymentRequest && (
        <UIPaymentRequestDetailsModal
          merchantTags={localMerchantTags}
          paymentRequest={RemotePaymentRequestToLocalPaymentRequest(paymentRequest)}
          hostedPaymentLink={`${apiUrl}/nextgen/pay/${paymentRequest.id}`}
          open={open}
          onRefundClick={onRefundClick}
          onTagAdded={onTagAdded}
          onTagCreated={onTagCreated}
          onTagDeleted={onTagDeleted}
          onDismiss={onDismiss}
        ></UIPaymentRequestDetailsModal>
      )}
    </div>
  );
};

export default PaymentRequestDetailsModal;
