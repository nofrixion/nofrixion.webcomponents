import {
  PaymentRequest,
  PaymentRequestAddress,
  PaymentRequestCreate,
  PaymentRequestPaymentAttempt,
  Tag,
} from '../api/types/ApiResponses';
import {
  CardTokenCreateModes,
  PartialPaymentMethods,
  PaymentMethodTypes,
  PaymentResult,
  Wallets,
} from '../api/types/Enums';
import {
  LocalAddressType,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
  LocalWallets,
} from '../types/LocalEnums';
import {
  LocalAddress,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPaymentRequestCreate,
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
    description: remotePaymentRequest.description ?? '',
    productOrService: remotePaymentRequest.title ?? '',
    hostedPayCheckoutUrl: remotePaymentRequest.hostedPayCheckoutUrl ?? '',
    partialPaymentMethod: parseApiPartialPaymentMethodToLocalPartialPaymentMethod(
      remotePaymentRequest.partialPaymentMethod,
    ),
    paymentAttempts: parseApiPaymentAttemptsToLocalPaymentAttempts(remotePaymentRequest.paymentAttempts),
  };
};

const parseLocalPaymentRequestCreateToRemotePaymentRequest = (
  merchantId: string,
  paymentRequest: LocalPaymentRequestCreate,
): PaymentRequestCreate => {
  // None = 0,
  // card = 1,
  // pisp = 2,
  // lightning = 4,
  // cardtoken = 8,
  // applePay = 16
  // googlePay = 32

  let paymentMethodTypes = paymentRequest.paymentMethods.card.active ? 1 : 0;
  paymentMethodTypes += paymentRequest.paymentMethods.bank.active ? 2 : 0;
  paymentMethodTypes += paymentRequest.paymentMethods.lightning ? 4 : 0;
  paymentMethodTypes += paymentRequest.paymentMethods.wallet ? 16 + 32 : 0;

  return {
    merchantID: merchantId,
    title: paymentRequest.productOrService,
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
    paymentMethodTypes: paymentMethodTypes.toString(),
    description: paymentRequest.description,
    cardAuthorizeOnly: !paymentRequest.paymentMethods.card.captureFunds,
    customerEmailAddress: paymentRequest.email,
    cardCreateToken: false,
    cardTokenCreateModes: CardTokenCreateModes.None,
    partialPaymentMethod: paymentRequest.paymentConditions.allowPartialPayments
      ? PartialPaymentMethods.Partial
      : PartialPaymentMethods.None,
    priorityBankID: paymentRequest.paymentMethods.bank.active
      ? paymentRequest.paymentMethods.bank.priority?.id
      : undefined,
    shippingFirstName: paymentRequest.firstName,
    shippingLastName: paymentRequest.lastName,
    notificationEmailAddresses: paymentRequest.notificationEmailAddresses,
  };
};

const parseRemotePaymentRequestToPaymentRequestCreate = (paymentRequest: PaymentRequest): PaymentRequestCreate => {
  return {
    merchantID: paymentRequest.merchantID,
    title: paymentRequest.title,
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
    paymentMethodTypes: paymentRequest.paymentMethodTypes,
    description: paymentRequest.description,
    cardAuthorizeOnly: paymentRequest.cardAuthorizeOnly,
    customerEmailAddress: paymentRequest.customerEmailAddress,
    cardCreateToken: paymentRequest.cardCreateToken,
    cardTokenCreateModes: CardTokenCreateModes.None,
    partialPaymentMethod: paymentRequest.partialPaymentMethod,
    priorityBankID: paymentRequest.priorityBankID,
    shippingFirstName: paymentRequest.addresses[0]?.firstName,
    shippingLastName: paymentRequest.addresses[0]?.lastName,
    notificationEmailAddresses: paymentRequest.notificationEmailAddresses,
    tagIds: paymentRequest.tags.map((tag) => tag.id),
  };
};

export {
  remotePaymentRequestToLocalPaymentRequest,
  parseApiTagToLocalTag,
  parseLocalPaymentRequestCreateToRemotePaymentRequest,
  parseRemotePaymentRequestToPaymentRequestCreate,
};
