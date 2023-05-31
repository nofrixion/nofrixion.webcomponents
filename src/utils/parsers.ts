import { PaymentRequest, PaymentRequestAddress, PaymentRequestPaymentAttempt, Tag } from '../api/types/ApiResponses';
import { PaymentMethodTypes, PaymentResult } from '../api/types/Enums';
import { LocalAddressType, LocalPaymentMethodTypes } from '../types/LocalEnums';
import {
  LocalAddress,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPaymentStatus,
  LocalTag,
} from '../types/LocalTypes';

const parseApiTagToLocalTag = (tag: Tag): LocalTag => {
  return {
    id: tag.id,
    name: tag.name,
    colourHex: tag.colourHex,
    description: tag.description,
    merchantID: tag.merchantID,
  };
};

const RemotePaymentRequestToLocalPaymentRequest = (remotePaymentRequest: PaymentRequest): LocalPaymentRequest => {
  const { addresses, inserted, customerEmailAddress, amount, currency, status, tags } = remotePaymentRequest;

  const parseApiStatusToLocalStatus = (status: PaymentResult): LocalPaymentStatus => {
    switch (status) {
      case PaymentResult.FullyPaid:
        return 'paid';
      case PaymentResult.PartiallyPaid:
        return 'partial';
      case PaymentResult.OverPaid:
        return 'overpaid';
      default:
        return 'unpaid';
    }
  };

  const parseApiPaymentMethodTypeToLocalMethodType = (
    paymentMethodType: PaymentMethodTypes,
  ): LocalPaymentMethodTypes => {
    switch (paymentMethodType) {
      case PaymentMethodTypes.Card:
        return LocalPaymentMethodTypes.Card;
      case PaymentMethodTypes.Pisp:
        return LocalPaymentMethodTypes.Pisp;
      case PaymentMethodTypes.ApplePay:
        return LocalPaymentMethodTypes.ApplePay;
      case PaymentMethodTypes.GooglePay:
        return LocalPaymentMethodTypes.GooglePay;
      case PaymentMethodTypes.Lightning:
        return LocalPaymentMethodTypes.Lightning;
      default:
        return LocalPaymentMethodTypes.None;
    }
  };

  const parseApiPaymentMethodTypesToLocalPaymentMethodTypes = (
    paymentMethodTypes: string,
  ): LocalPaymentMethodTypes[] => {
    const paymentMethodTypesArray = paymentMethodTypes.split(',');
    const localPaymentMethodTypesArray: LocalPaymentMethodTypes[] = [];

    paymentMethodTypesArray.forEach((paymentMethodType) => {
      switch (paymentMethodType) {
        case 'card':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Card);
          break;
        case 'pisp':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Pisp);
          break;
        case 'applepay':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.ApplePay);
          break;
        case 'googlepay':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.GooglePay);
          break;
        case 'lightning':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Lightning);
          break;
        default:
          break;
      }
    });

    return localPaymentMethodTypesArray;
  };

  const parseApiAddressTypeToLocalAddressType = (addressType: string): LocalAddressType => {
    switch (addressType) {
      case 'Shipping':
        return LocalAddressType.Shipping;
      case 'Billing':
        return LocalAddressType.Billing;
      default:
        return LocalAddressType.Unknown;
    }
  };

  const parseApiAddressToLocalAddress = (remoteAddress: PaymentRequestAddress): LocalAddress => {
    const {
      addressLine1,
      addressLine2,
      addressCity,
      addressCounty,
      addressPostCode,
      addressCountryCode,
      phone,
      email,
      addressType,
    } = remoteAddress;
    return {
      addressLine1: addressLine1 ?? '',
      addressLine2: addressLine2 ?? '',
      addressCity: addressCity ?? '',
      addressCounty: addressCounty ?? '',
      addressPostCode: addressPostCode ?? '',
      addressCountryCode: addressCountryCode ?? '',
      phone: phone ?? '',
      email: email ?? '',
      addressType: parseApiAddressTypeToLocalAddressType(addressType),
    };
  };

  const parseApiPaymentAttemptsToLocalPaymentAttempts = (
    remotePaymentAttempts: PaymentRequestPaymentAttempt[],
  ): LocalPaymentAttempt[] => {
    if (remotePaymentAttempts.length === 0) {
      return [];
    } else {
      const localPaymentAttempts: LocalPaymentAttempt[] = [];
      remotePaymentAttempts.map((remotePaymentAttempt) => {
        if (remotePaymentAttempt.settledAt || remotePaymentAttempt.authorisedAt) {
          const {
            attemptKey,
            authorisedAt,
            settledAt,
            paymentMethod,
            authorisedAmount,
            settledAmount,
            currency,
            walletName,
          } = remotePaymentAttempt;
          localPaymentAttempts.push({
            attemptKey: attemptKey,
            occurredAt: new Date(settledAt ?? authorisedAt ?? 0),
            paymentMethod: parseApiPaymentMethodTypeToLocalMethodType(paymentMethod),
            amount: settledAmount > 0 ? settledAmount : authorisedAmount,
            currency: currency,
            processor: walletName ?? '',
          });
        }
      });
      return localPaymentAttempts;
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
    tags: tags.map((tag) => parseApiTagToLocalTag(tag)),
    paymentMethodTypes: parseApiPaymentMethodTypesToLocalPaymentMethodTypes(remotePaymentRequest.paymentMethodTypes),
    addresses: addresses.map((address) => parseApiAddressToLocalAddress(address)),
    description: remotePaymentRequest.description ?? '',
    productOrService: remotePaymentRequest.title ?? '',
    hostedPayCheckoutUrl: remotePaymentRequest.hostedPayCheckoutUrl ?? '',
    paymentAttempts: parseApiPaymentAttemptsToLocalPaymentAttempts(remotePaymentRequest.paymentAttempts),
  };
};

export { RemotePaymentRequestToLocalPaymentRequest, parseApiTagToLocalTag };
