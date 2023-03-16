interface LocalContact {
  name: string;
  email: string;
}

type LocalPaymentStatus = 'paid' | 'partial' | 'unpaid';
type LocalCurrency = 'EUR' | 'GBP';

interface LocalPaymentRequest {
  status: LocalPaymentStatus;
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: LocalCurrency;
  tags: string[];
}
