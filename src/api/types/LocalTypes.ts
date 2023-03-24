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
