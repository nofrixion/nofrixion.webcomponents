import { useEffect, useState } from 'react';
import UIPaymentRequestDetailsModal from '../../ui/PaymentRequestDetailsModal/PaymentRequestDetailsModal';
import { parseApiTagToLocalTag, remotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import {
  PaymentRequestClient,
  PaymentRequest,
  PaymentRequestUpdate,
  MerchantClient,
  usePaymentRequestsProps,
  usePaymentRequest,
} from '@nofrixion/moneymoov';
import { makeToast } from '@/components/ui/Toast/Toast';

interface PaymentRequestDetailsModalProps extends usePaymentRequestsProps {
  token?: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl: string; // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string;
  selectedPaymentRequestID: string;
  merchantTags: LocalTag[];
  paymentRequests: LocalPaymentRequest[];
  open: boolean;
  onDismiss: () => void;
  setMerchantTags: (merchantTags: LocalTag[]) => void;
  setPaymentRequests: (paymentRequests: LocalPaymentRequest[]) => void;
  onRefund: (authorizationID: string, amount: number) => Promise<void>;
  onCapture: (authorizationID: string, amount: number) => Promise<void>;
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
  onRefund,
  onCapture,
  statusSortDirection,
  createdSortDirection,
  contactSortDirection,
  amountSortDirection,
  pageNumber,
  pageSize,
  fromDateMS,
  toDateMS,
  status,
  search,
  currency,
  minAmount,
  maxAmount,
  tags,
}: PaymentRequestDetailsModalProps) => {
  const paymentRequestClient = new PaymentRequestClient({
    apiUrl: apiUrl,
    authToken: token,
  });
  const merchantClient = new MerchantClient({ apiUrl: apiUrl, authToken: token });

  const [paymentRequest, setPaymentRequest] = useState<LocalPaymentRequest | undefined>(undefined);

  const { data: paymentRequestResponse } = usePaymentRequest(
    {
      merchantId: merchantId,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      amountSortDirection: amountSortDirection,
      pageNumber: pageNumber,
      pageSize: pageSize,
      fromDateMS: fromDateMS,
      toDateMS: toDateMS,
      status: status,
      search: search,
      currency: currency,
      minAmount: minAmount,
      maxAmount: maxAmount,
      tags: tags,
    },
    {
      paymentRequestId: selectedPaymentRequestID,
      merchantId: merchantId,
    },
    { apiUrl: apiUrl, authToken: token },
  );

  useEffect(() => {
    if (paymentRequestResponse?.status === 'success') {
      setPaymentRequest(remotePaymentRequestToLocalPaymentRequest(paymentRequestResponse.data));
    } else if (paymentRequestResponse?.status === 'error') {
      makeToast('error', 'Could not get payment request details.');
    }
  }, [paymentRequestResponse]);

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

  const onModalDismiss = () => {
    setPaymentRequest(undefined);
    onDismiss();
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
          onDismiss={onModalDismiss}
        ></UIPaymentRequestDetailsModal>
      )}
    </div>
  );
};

export default PaymentRequestDetailsModal;
