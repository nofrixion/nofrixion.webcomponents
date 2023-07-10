import { useEffect, useState } from 'react';
import UIPaymentRequestDetailsModal from '../../ui/PaymentRequestDetailsModal/PaymentRequestDetailsModal';
import { parseApiTagToLocalTag } from '../../../utils/parsers';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import { PaymentRequestClient, PaymentRequest, PaymentRequestUpdate, MerchantClient } from '@nofrixion/moneymoov';

interface PaymentRequestDetailsModalProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl: string; // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string;
  selectedPaymentRequestID: string;
  merchantTags: LocalTag[];
  paymentRequests: LocalPaymentRequest[];
  open: boolean;
  onDismiss: () => void;
  setMerchantTags: (merchantTags: LocalTag[]) => void;
  setPaymentRequests: (paymentRequests: LocalPaymentRequest[]) => void;
  onUnauthorized: () => void;
  onRefund: (paymentAttemptID: string) => void;
  onCapture: (authorizationID: string, amount: number) => void;
}
const PaymentRequestDetailsModal = ({
  token,
  apiUrl,
  merchantId,
  selectedPaymentRequestID,
  merchantTags,
  paymentRequests,
  open,
  onDismiss,
  setMerchantTags,
  setPaymentRequests,
  onUnauthorized,
  onRefund,
  onCapture,
}: PaymentRequestDetailsModalProps) => {
  const paymentRequestClient = new PaymentRequestClient({
    apiUrl: apiUrl,
    authToken: token,
    onUnauthorized: onUnauthorized,
  });
  const merchantClient = new MerchantClient({ apiUrl: apiUrl, authToken: token, onUnauthorized: onUnauthorized });

  const [paymentRequest, setPaymentRequest] = useState<LocalPaymentRequest | undefined>(undefined);

  useEffect(() => {
    if (selectedPaymentRequestID) {
      const paymentRequest = paymentRequests.find((paymentRequest) => paymentRequest.id === selectedPaymentRequestID);
      if (paymentRequest) {
        setPaymentRequest(paymentRequest);
      }
    }
  }, [selectedPaymentRequestID, paymentRequests]);

  const updatePaymentRequests = (updatedPaymentRequest: PaymentRequest) => {
    const index = paymentRequests.findIndex((paymentRequest) => paymentRequest.id === selectedPaymentRequestID);

    if (index !== -1) {
      paymentRequests[index].tags = updatedPaymentRequest.tags.map((tag) => parseApiTagToLocalTag(tag));
    }
    setPaymentRequests(paymentRequests);
  };

  const onTagAdded = async (tag: LocalTag) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? [];
      const paymentRequestUpdate: PaymentRequestUpdate = {
        tagIds: existingTagIds.concat(tag.id),
      };
      const paymentRequestTagAdd = await paymentRequestClient.update(paymentRequest.id, paymentRequestUpdate);
      if (paymentRequestTagAdd.status === 'error') {
        console.log(paymentRequestTagAdd.error);
      } else if (paymentRequestTagAdd.data) {
        updatePaymentRequests(paymentRequestTagAdd.data);
      }
    }
  };

  const onTagCreated = async (tag: LocalTag) => {
    if (paymentRequest) {
      const response = await merchantClient.addTag({ merchantId }, parseApiTagToLocalTag(tag));
      if (response.status === 'error') {
        console.log(response.error);
      } else {
        const createdTag = response.data;
        if (createdTag) {
          merchantTags.push(createdTag);
          setMerchantTags(merchantTags);
          const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? [];
          const paymentRequestUpdate: PaymentRequestUpdate = {
            tagIds: existingTagIds.concat(createdTag.id),
          };
          const paymentRequestTagAdd = await paymentRequestClient.update(paymentRequest.id, paymentRequestUpdate);
          if (paymentRequestTagAdd.status === 'error') {
            console.log(paymentRequestTagAdd.error);
          } else if (paymentRequestTagAdd.data) {
            updatePaymentRequests(paymentRequestTagAdd.data);
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
      if (paymentRequestTagDelete.status === 'error') {
        console.log(paymentRequestTagDelete.error);
      } else if (paymentRequestTagDelete.data) {
        updatePaymentRequests(paymentRequestTagDelete.data);
      }
    }
  };

  return (
    <div>
      {paymentRequest && (
        <UIPaymentRequestDetailsModal
          merchantTags={merchantTags}
          paymentRequest={paymentRequest}
          hostedPaymentLink={`${paymentRequest.hostedPayCheckoutUrl}`}
          open={open}
          onRefund={onRefund}
          onCapture={onCapture}
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
