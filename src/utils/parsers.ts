import { PaymentRequest } from '../api/types/ApiResponses';
import { PaymentResult } from '../api/types/Enums';

const RemotePaymentRequestToLocalPaymentRequest = (remotePaymentRequest: PaymentRequest): LocalPaymentRequest => {
  const { addresses, inserted, customerEmailAddress, amount, currency, status } = remotePaymentRequest;

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
    status: parseApiStatusToLocalStatus(status),
    createdAt: new Date(inserted),
    contact: {
      name: addresses.length ? `${addresses[0].firstName} ${addresses[0].lastName}` : '',
      email: customerEmailAddress ?? '',
    },
    amount: amount,
    currency: currency,
    tags: [], // TODO: Add tags when they are available in the API
  };
};

export { RemotePaymentRequestToLocalPaymentRequest };