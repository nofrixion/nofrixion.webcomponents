import { PaymentRequest } from '../api/types/ApiResponses';
import { PaymentResult } from '../api/types/Enums';
import { LocalPaymentRequest, LocalPaymentStatus } from '../api/types/LocalTypes';

const RemotePaymentRequestToLocalPaymentRequest = (remotePaymentRequest: PaymentRequest): LocalPaymentRequest => {
  const { addresses, inserted, customerEmailAddress, amount, currency, status, tags } = remotePaymentRequest;

  const parseApiStatusToLocalStatus = (status: PaymentResult): LocalPaymentStatus => {
    switch (status) {
      case PaymentResult.FullyPaid:
        return 'paid';
      case PaymentResult.PartiallyPaid:
        return 'partial';
      default:
        return 'unpaid';
    }
  };

  return {
    id: remotePaymentRequest.id,
    status: parseApiStatusToLocalStatus(status),
    createdAt: new Date(inserted),
    contact: {
      name: addresses.length ? `${addresses[0].firstName} ${addresses[0].lastName}` : '',
      email: customerEmailAddress ?? '',
    },
    amount: amount,
    currency: currency,
    tags: tags,
  };
};

export { RemotePaymentRequestToLocalPaymentRequest };
