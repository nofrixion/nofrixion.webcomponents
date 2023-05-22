import { StoryFn, Meta } from '@storybook/react';
import Transactions, { Transaction } from './Transactions';
import { PaymentMethod } from '../../../types/LocalEnums';
import { Currency } from '../../../api/types/Enums';

export default {
  title: 'UI/Transactions',
  component: Transactions,
} as Meta<typeof Transactions>;
const transactions: Transaction[] = [
  {
    paymentAttemptID: '1234567890',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: PaymentMethod.Card,
    amount: 999999.0234,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: '45634567890',
    occurredAt: new Date('2023-03-23'),
    paymentMethod: PaymentMethod.Card,
    amount: 50000000.0345,
    currency: Currency.GBP,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: '7654567890',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: PaymentMethod.Pisp,
    amount: 50000000.0345,
    currency: Currency.GBP,
    processor: 'Revolut',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: '234567890',
    occurredAt: new Date('2023-05-2'),
    paymentMethod: PaymentMethod.Pisp,
    amount: 999.0345,
    currency: Currency.EUR,
    processor: 'Bank of Ireland',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: '6543234567890',
    occurredAt: new Date('2023-05-1'),
    paymentMethod: PaymentMethod.ApplePay,
    amount: 5000.0345,
    currency: Currency.EUR,
    processor: 'Apple Pay',
  },
  {
    paymentAttemptID: '234567890',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: PaymentMethod.GooglePay,
    amount: 50.0345,
    currency: Currency.EUR,
    processor: 'Google Pay',
  },
  // Add more transactions as needed
];

const Template: StoryFn<typeof Transactions> = (args) => {
  return (
    <>
      <Transactions {...args} />
    </>
  );
};
export const Showcase = Template.bind({});
Showcase.args = {
  transactions: transactions,
  onRefundClicked: () => {
    console.log('Refund clicked for paymentAttemptID: ');
  },
};
