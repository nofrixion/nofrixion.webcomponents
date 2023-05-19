import { Tag } from './ApiResponses';
import { Currency } from './Enums';

export interface LocalContact {
  name: string;
  email: string;
}

export type LocalPaymentStatus = 'paid' | 'partial' | 'unpaid';

export interface LocalPaymentRequest {
  id: string;
  status: LocalPaymentStatus;
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: Currency;
  tags: Tag[];
}

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
}

export interface LocalPaymentConditionsFormValue {
  allowPartialPayments: boolean;
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
}

export interface LocalTag {
  ID: string;
  merchantID?: string;
  name: string;
  colourHex?: string;
  description?: string;
}
