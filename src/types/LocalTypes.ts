import { Currency } from '../api/types/Enums';
import { LocalAddressType, LocalPaymentMethodTypes } from './LocalEnums';

export interface LocalContact {
  name: string;
  email: string;
}

export type LocalPaymentStatus = 'paid' | 'partial' | 'unpaid' | 'overpaid';

export interface LocalPaymentRequest {
  id: string;
  status: LocalPaymentStatus;
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: Currency;
  tags: LocalTag[];
  paymentMethodTypes: LocalPaymentMethodTypes[];
  addresses: LocalAddress[];
  description: string;
  productOrService: string;
  hostedPayCheckoutUrl: string;
  paymentAttempts: LocalPaymentAttempt[];
}

export interface LocalPaymentAttempt {
  paymentAttemptID: string;
  occurredAt: Date;
  paymentMethod: LocalPaymentMethodTypes;
  amount: number;
  currency: Currency.EUR | Currency.GBP;
  processor: string;
  last4DigitsOfCardNumber?: string;
}

export type LocalAddress = {
  addressLine1?: string;
  addressLine2?: string;
  addressCity?: string;
  addressCounty?: string;
  addressPostCode?: string;
  addressCountryCode?: string;
  phone?: string;
  email?: string;
  addressType: LocalAddressType;
};

export interface LocalPaymentRequestCreate {
  amount: number;
  currency: Currency;
  productOrService: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  paymentConditions: {
    allowPartialPayments: boolean;
  };
  paymentMethods: {
    bank: {
      active: boolean;
      priority?: {
        id: string;
        name: string;
      };
    };
    card: {
      active: boolean;
      captureFunds: boolean;
    };
    wallet: boolean;
    lightning: boolean;
  };
  tagIds?: string[];
}

export interface LocalPaymentConditionsFormValue {
  allowPartialPayments: boolean;
  isDefault: boolean;
}

export interface LocalPaymentMethodsFormValue {
  isBankEnabled: boolean;
  isCardEnabled: boolean;
  isWalletEnabled: boolean;
  isLightningEnabled: boolean;
  isCaptureFundsEnabled: boolean;
  priorityBank?: {
    id: string;
    name: string;
  };
  isDefault: boolean;
}

export interface LocalTag {
  ID?: string;
  merchantID?: string;
  name: string;
  colourHex?: string;
  description?: string;
}
