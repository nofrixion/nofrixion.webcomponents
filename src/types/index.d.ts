interface LocalContact {
  name: string;
  email: string;
}

type LocalPaymentStatus = 'paid' | 'partial' | 'unpaid';

interface LocalPaymentRequest {
  status: LocalPaymentStatus;
  createdAt: Date;
  contact: LocalContact;
  amount: number;
  currency: Currency;
  tags: string[];
}
