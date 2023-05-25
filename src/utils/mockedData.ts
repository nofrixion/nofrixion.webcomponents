import { mock } from 'node:test';
import { Currency } from '../api/types/Enums';
import { LocalAddressType, LocalPaymentMethodTypes } from '../types/LocalEnums';
import { LocalPaymentAttempt, LocalPaymentRequest } from '../types/LocalTypes';

export const mockTags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
];

export const mockMerchantTags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
  {
    ID: '5',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 1',
  },
  {
    ID: '6',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 2',
  },
  {
    ID: '7',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 3',
  },
  {
    ID: '8',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 4',
  },
];

export const mockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    paymentAttemptID: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 30.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: 'ca2eb453-9c12-4f8f-b8b2-7c1c6af842ba',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 5.34,
    currency: Currency.EUR,
    processor: 'Revolut',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: '43535f79-a9f2-4331-9a78-db731e467c49',
    occurredAt: new Date('2023-05-2'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 7.9,
    currency: Currency.EUR,
    processor: 'Bank of Ireland',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: 'a9f6c19a-0172-47a6-803a-c3f59899cafc',
    occurredAt: new Date('2023-05-1'),
    paymentMethod: LocalPaymentMethodTypes.ApplePay,
    amount: 15.39,
    currency: Currency.EUR,
    processor: 'Apple Pay',
  },
  {
    paymentAttemptID: '7bbb2998-8d78-4b2a-9334-84444c9915c8',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.GooglePay,
    amount: 20.78,
    currency: Currency.EUR,
    processor: 'Google Pay',
  },
  // Add more transactions as needed
];

export const partiallyPaidMockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    paymentAttemptID: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 30.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
  },
  // Add more transactions as needed
];
export const overpaidMockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    paymentAttemptID: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    paymentAttemptID: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 90.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
  },
  // Add more transactions as needed
];

const regular: LocalPaymentRequest = {
  id: 'fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
  amount: 100.0,
  currency: Currency.EUR,
  paymentMethodTypes: [
    LocalPaymentMethodTypes.Card,
    LocalPaymentMethodTypes.Pisp,
    LocalPaymentMethodTypes.ApplePay,
    LocalPaymentMethodTypes.GooglePay,
  ],
  addresses: [
    {
      addressType: LocalAddressType.Shipping,
      addressLine1: '8 Harcourt Street',
      addressLine2: '',
      addressCity: 'Dublin',
      addressCounty: 'Dublin',
      addressPostCode: 'D02 AF58',
      addressCountryCode: 'Ireland',
      phone: '+35319695400',
      email: 'contact@nofrixion.com',
    },
  ],
  status: 'paid',
  createdAt: new Date('2023-05-17T19:02:37.8484876+00:00'),
  tags: mockTags,
  contact: {
    name: 'John Doe',
    email: 'johndoe@email.com',
  },
  hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
  description:
    'Curabitur ultricies ligula vitae tellus fringilla consequat. Pellentesque in tortor eu nibh lobortis ultrices vel in quam. Nunc tristique egestas purus et hendrerit.',
  productOrService: 'Flight lessons',
  paymentAttempts: mockPaymentAttempts,
};

const partiallyPaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: partiallyPaidMockPaymentAttempts,
  status: 'partial',
};

const unpaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: [],
  status: 'unpaid',
};

const overpaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: overpaidMockPaymentAttempts,
  status: 'overpaid',
};

const noShippingAddress: LocalPaymentRequest = {
  id: '5cb6f5c8-ce16-411f-9f55-29fb022bb444',
  amount: 285.0,
  currency: Currency.EUR,
  paymentMethodTypes: [
    LocalPaymentMethodTypes.Pisp,
    LocalPaymentMethodTypes.ApplePay,
    LocalPaymentMethodTypes.GooglePay,
  ],
  addresses: [],
  status: 'unpaid',
  tags: [],
  createdAt: new Date('2023-05-17T19:02:37.8484876+00:00'),
  contact: {
    name: 'John Doe',
    email: 'johndoe@email.com',
  },
  hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/5cb6f5c8-ce16-411f-9f55-29fb022bb444',
  description:
    'Curabitur ultricies ligula vitae tellus fringilla consequat. Pellentesque in tortor eu nibh lobortis ultrices vel in quam. Nunc tristique egestas purus et hendrerit.',
  productOrService: 'Flight lessons',
  paymentAttempts: mockPaymentAttempts,
};

export default {
  paymentRequests: {
    regular,
    noShippingAddress,
    partiallyPaidPaymentRequest,
    unpaidPaymentRequest,
    overpaidPaymentRequest,
  },
  merchantTags: mockMerchantTags,
};
