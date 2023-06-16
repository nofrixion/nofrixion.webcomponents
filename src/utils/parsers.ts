import {
  PaymentRequest,
  PaymentRequestAddress,
  PaymentRequestEvent,
  PaymentRequestPaymentAttempt,
  Tag,
} from '../api/types/ApiResponses';
import {
  Currency,
  PartialPaymentMethods,
  PaymentMethodTypes,
  PaymentProcessor,
  PaymentRequestEventType,
  PaymentResult,
  Wallets,
} from '../api/types/Enums';
import {
  LocalAddressType,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
  LocalPaymentProcessor,
  LocalPaymentRequestEventType,
  LocalWallets,
} from '../types/LocalEnums';
import {
  LocalAddress,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPaymentRequestEvent,
  LocalPaymentStatus,
  LocalTag,
} from '../types/LocalTypes';
import * as events from 'events';

const parseApiTagToLocalTag = (tag: Tag): LocalTag => {
  return {
    id: tag.id,
    name: tag.name,
    colourHex: tag.colourHex,
    description: tag.description,
    merchantID: tag.merchantID,
  };
};

const remotePaymentRequestToLocalPaymentRequest = (remotePaymentRequest: PaymentRequest): LocalPaymentRequest => {
  const { addresses, events, inserted, customerEmailAddress, amount, currency, status, tags } = remotePaymentRequest;

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
      paymentMethodType = paymentMethodType.trim();
      switch (paymentMethodType) {
        case 'card':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Card);
          break;
        case 'pisp':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Pisp);
          break;
        case 'applePay':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.ApplePay);
          break;
        case 'googlePay':
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

  const parseApiPaymentRequestEventTypeToLocalType = (
    paymentRequestEventType: string,
  ): LocalPaymentRequestEventType => {
    switch (paymentRequestEventType) {
      case 'card_payer_authentication_setup':
        return LocalPaymentRequestEventType.card_payer_authentication_setup;
      case 'card_authorization':
        return LocalPaymentRequestEventType.card_authorization;
      case 'card_sale':
        return LocalPaymentRequestEventType.card_sale;
      case 'card_capture':
        return LocalPaymentRequestEventType.card_capture;
      case 'card_void':
        return LocalPaymentRequestEventType.card_void;
      case 'pisp_initiate':
        return LocalPaymentRequestEventType.pisp_initiate;
      case 'pisp_callback':
        return LocalPaymentRequestEventType.pisp_callback;
      case 'lightning_invoice_created':
        return LocalPaymentRequestEventType.lightning_invoice_created;
      case 'lightning_invoice_paid':
        return LocalPaymentRequestEventType.lightning_invoice_paid;
      case 'card_payer_authentication_failure':
        return LocalPaymentRequestEventType.card_payer_authentication_failure;
      case 'pisp_webhook':
        return LocalPaymentRequestEventType.pisp_webhook;
      case 'pisp_settle':
        return LocalPaymentRequestEventType.pisp_settle;
      default:
        return LocalPaymentRequestEventType.unknown;
    }
  };

  const parseApiPaymentProcessorToLocalPaymentProcessor = (paymentProcessor: string): LocalPaymentProcessor => {
    switch (paymentProcessor) {
      case 'CyberSource':
        return LocalPaymentProcessor.CyberSource;
      case 'Checkout':
        return LocalPaymentProcessor.Checkout;
      case 'Stripe':
        return LocalPaymentProcessor.Stripe;
      case 'Modulr':
        return LocalPaymentProcessor.Modulr;
      case 'Plaid':
        return LocalPaymentProcessor.Plaid;
      case 'Yapily':
        return LocalPaymentProcessor.Yapily;
      default:
        return LocalPaymentProcessor.None;
    }
  };

  const parseApiPaymentRequestEventToLocalEvent = (
    paymentRequestEvent: PaymentRequestEvent,
  ): LocalPaymentRequestEvent => {
    const {
      id,
      paymentRequestID,
      eventType,
      amount,
      currency,
      status,
      errorReason,
      errorMessage,
      rawResponse,
      rawResponseHash,
      cardRequestID,
      cardTransactionID,
      cardTokenCustomerID,
      cardAuthorizationResponseID,
      lightningInvoice,
      pispPaymentServiceProviderID,
      pispPaymentInitiationID,
      pispRedirectUrl,
      pispToken,
      paymentProcessorName,
    } = paymentRequestEvent;

    return {
      id: id,
      paymentRequestID: paymentRequestID,
      eventType: parseApiPaymentRequestEventTypeToLocalType(eventType),
      amount: amount,
      currency: currency,
      status: status,
      errorReason: errorReason,
      errorMessage: errorMessage,
      rawResponse: rawResponse,
      rawResponseHash: rawResponseHash,
      cardRequestID: cardRequestID,
      cardTransactionID: cardTransactionID,
      cardTokenCustomerID: cardTokenCustomerID,
      cardAuthorizationResponseID: cardAuthorizationResponseID,
      lightningInvoice: lightningInvoice,
      pispPaymentServiceProviderID: pispPaymentServiceProviderID,
      pispPaymentInitiationID: pispPaymentInitiationID,
      pispRedirectUrl: pispRedirectUrl,
      pispToken: pispToken,
      paymentProcessorName: parseApiPaymentProcessorToLocalPaymentProcessor(paymentProcessorName),
    };
  };

  const parseApiWalletTypeToLocalWalletType = (walletType: Wallets): LocalWallets | undefined => {
    switch (walletType) {
      case Wallets.ApplePay:
        return LocalWallets.ApplePay;
      case Wallets.GooglePay:
        return LocalWallets.GooglePay;
      default:
        return undefined;
    }
  };

  const parseWalletNameToPaymentMethodType = (walletName: Wallets): LocalPaymentMethodTypes => {
    switch (walletName) {
      case Wallets.ApplePay:
        return LocalPaymentMethodTypes.ApplePay;
      case Wallets.GooglePay:
        return LocalPaymentMethodTypes.GooglePay;
      default:
        return LocalPaymentMethodTypes.None;
    }
  };

  const parseApiPartialPaymentMethodToLocalPartialPaymentMethod = (
    partialPaymentMethod: PartialPaymentMethods,
  ): LocalPartialPaymentMethods => {
    switch (partialPaymentMethod) {
      case PartialPaymentMethods.None:
        return LocalPartialPaymentMethods.None;
      case PartialPaymentMethods.Partial:
        return LocalPartialPaymentMethods.Partial;
      default:
        return LocalPartialPaymentMethods.None;
    }
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
            paymentMethod: walletName
              ? parseWalletNameToPaymentMethodType(walletName)
              : parseApiPaymentMethodTypeToLocalMethodType(paymentMethod),
            amount: settledAmount > 0 ? settledAmount : authorisedAmount,
            currency: currency,
            processor: walletName ? parseApiWalletTypeToLocalWalletType(walletName) : undefined,
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
      name: addresses.length ? `${addresses[0].firstName} ${addresses[0].lastName}` : undefined,
      email: customerEmailAddress ?? undefined,
    },
    amount: amount,
    currency: currency,
    tags: tags.map((tag) => parseApiTagToLocalTag(tag)),
    paymentMethodTypes: parseApiPaymentMethodTypesToLocalPaymentMethodTypes(remotePaymentRequest.paymentMethodTypes),
    addresses: addresses.map((address) => parseApiAddressToLocalAddress(address)),
    events: events.map((event) => parseApiPaymentRequestEventToLocalEvent(event)),
    description: remotePaymentRequest.description ?? '',
    productOrService: remotePaymentRequest.title ?? '',
    hostedPayCheckoutUrl: remotePaymentRequest.hostedPayCheckoutUrl ?? '',
    partialPaymentMethod: parseApiPartialPaymentMethodToLocalPartialPaymentMethod(
      remotePaymentRequest.partialPaymentMethod,
    ),
    paymentAttempts: parseApiPaymentAttemptsToLocalPaymentAttempts(remotePaymentRequest.paymentAttempts),
  };
};

export { remotePaymentRequestToLocalPaymentRequest, parseApiTagToLocalTag };
