import {
  Currency,
  PartialPaymentMethods,
  PaymentMethodTypes,
  PaymentRequest,
  PaymentRequestAddress,
  PaymentRequestEvent,
  PaymentRequestEventType,
  PaymentRequestPaymentAttempt,
  PaymentResult,
  Tag,
  Wallets,
} from '@nofrixion/moneymoov';

import {
  LocalAddressType,
  LocalCardPaymentResponseStatus,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
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
    remotePaymentEvents: PaymentRequestEvent[],
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
            attemptedAmount,
            paymentMethod,
            authorisedAmount,
            settledAmount,
            currency,
            walletName,
            status,
          } = remotePaymentAttempt;

          const transactionEvents = remotePaymentEvents.filter(
            (event) => event.cardAuthorizationResponseID === attemptKey,
          );

          const capturedAmount = transactionEvents
            .filter(
              (event) =>
                event.eventType === PaymentRequestEventType.card_capture &&
                (event.status === LocalCardPaymentResponseStatus.CardCaptureSuccess ||
                  event.status === LocalCardPaymentResponseStatus.CardCheckoutCaptured),
            )
            .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0);

          localPaymentAttempts.push({
            attemptKey: attemptKey,
            occurredAt: new Date(settledAt ?? authorisedAt ?? 0),
            paymentMethod: walletName
              ? parseWalletNameToPaymentMethodType(walletName)
              : parseApiPaymentMethodTypeToLocalMethodType(paymentMethod),
            amount: attemptedAmount,
            currency: currency,
            processor: walletName ? parseApiWalletTypeToLocalWalletType(walletName) : undefined,
            needsCapture:
              status === PaymentResult.Authorized ||
              (status === PaymentResult.PartiallyPaid && capturedAmount < attemptedAmount),
            capturedAmount: capturedAmount,
            events: transactionEvents.map((transactionEvent) => {
              return parseApiPaymentRequestEventToLocalPaymentRequestEvent(transactionEvent);
            }),
          });
        }
      });
      return localPaymentAttempts;
    }
  };

  const parseApiPaymentRequestEventToLocalPaymentRequestEvent = (
    remotePaymentRequestEvent: PaymentRequestEvent,
  ): LocalPaymentRequestEvent => {
    const { id, inserted, eventType, amount, currency, status, cardAuthorizationResponseID } =
      remotePaymentRequestEvent;

    return {
      id: id,
      occurredAt: new Date(inserted),
      authorizationID: cardAuthorizationResponseID,
      type: eventType,
      amount: amount,
      currency: currency,
      status: status,
    };
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
    description: remotePaymentRequest.description ?? '',
    productOrService: remotePaymentRequest.title ?? '',
    hostedPayCheckoutUrl: remotePaymentRequest.hostedPayCheckoutUrl ?? '',
    partialPaymentMethod: parseApiPartialPaymentMethodToLocalPartialPaymentMethod(
      remotePaymentRequest.partialPaymentMethod,
    ),
    paymentAttempts: parseApiPaymentAttemptsToLocalPaymentAttempts(
      remotePaymentRequest.paymentAttempts,
      remotePaymentRequest.events,
    ),
    priorityBankID: remotePaymentRequest.priorityBankID,
    notificationEmailAddresses: remotePaymentRequest.notificationEmailAddresses,
    captureFunds: !remotePaymentRequest.cardAuthorizeOnly,
  };
};

export { remotePaymentRequestToLocalPaymentRequest, parseApiTagToLocalTag };
