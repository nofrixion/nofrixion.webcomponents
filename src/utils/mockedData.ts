import { Currency } from '@nofrixion/moneymoov';
import { LocalAddressType, LocalPartialPaymentMethods, LocalPaymentMethodTypes } from '../types/LocalEnums';
import { LocalPaymentAttempt, LocalPaymentRequest } from '../types/LocalTypes';

export const mockTags = [
  {
    id: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    id: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    id: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    id: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
];

export const mockMerchantTags = [
  {
    id: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    id: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    id: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    id: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
  {
    id: '5',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 1',
  },
  {
    id: '6',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 2',
  },
  {
    id: '7',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 3',
  },
  {
    id: '8',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 4',
  },
];

export const mockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 30.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: 'ca2eb453-9c12-4f8f-b8b2-7c1c6af842ba',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 5.34,
    currency: Currency.EUR,
    processor: 'Revolut',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: '43535f79-a9f2-4331-9a78-db731e467c49',
    occurredAt: new Date('2023-05-2'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 7.9,
    currency: Currency.EUR,
    processor: 'Bank of Ireland',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: 'a9f6c19a-0172-47a6-803a-c3f59899cafc',
    occurredAt: new Date('2023-05-1'),
    paymentMethod: LocalPaymentMethodTypes.ApplePay,
    amount: 15.39,
    currency: Currency.EUR,
    processor: 'Apple Pay',
  },
  {
    attemptKey: '7bbb2998-8d78-4b2a-9334-84444c9915c8',
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
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
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
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
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
  partialPaymentMethod: LocalPartialPaymentMethods.None,
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
  partialPaymentMethod: LocalPartialPaymentMethods.None,
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

const fewPaymentRequests: LocalPaymentRequest[] = [
  {
    id: '1',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 1))),
    contact: {
      name: 'Lukas Müller',
      email: 'lukas.mueller@email.de',
    },
    amount: 900,
    currency: Currency.EUR,
    tags: [
      {
        id: '1',
        description: 'Logo Design',
        colourHex: '#FF0000',
        name: 'Logo Design',
        merchantID: '1',
      },
      {
        id: '2',
        description: 'Web Design',
        colourHex: '#00FF00',
        name: 'Web Design',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '2',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 3))),
    contact: {
      name: 'Miguel García',
      email: 'miguel.garcia@email.es',
    },
    amount: 1800,
    currency: Currency.EUR,
    tags: [
      {
        id: '3',
        description: 'App Development',
        colourHex: '#0000FF',
        name: 'App Development',
        merchantID: '1',
      },
      {
        id: '4',
        description: 'UI Design',
        colourHex: '#FF00FF',
        name: 'UI Design',
        merchantID: '1',
      },
      {
        id: '5',
        description: 'EU Client',
        colourHex: '#FFFF00',
        name: 'EU Client',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '3',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    contact: {
      name: 'Lucas Jones',
      email: 'lucas.jones@email.co.uk',
    },
    amount: 2700,
    currency: Currency.GBP,
    tags: [
      { id: '6', description: 'ecommerce', colourHex: '#FF0000', name: 'ecommerce', merchantID: '1' },
      { id: '7', description: 'web-development', colourHex: '#00FF00', name: 'web-development', merchantID: '1' },
      { id: '8', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '4',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    contact: {
      name: 'Sophie Smith',
      email: 'sophie.smith@email.co.uk',
    },
    amount: 2500,
    currency: Currency.GBP,
    tags: [
      { id: '9', description: 'web-design', colourHex: '#FF0000', name: 'web-design', merchantID: '1' },
      { id: '10', description: 'branding', colourHex: '#00FF00', name: 'branding', merchantID: '1' },
      { id: '11', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '5',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    contact: {
      name: 'Oliver Johnson',
      email: 'oliver.johnson@email.co.uk',
    },
    amount: 3000,
    currency: Currency.GBP,
    tags: [
      { id: '7', description: 'web-development', colourHex: '#FF0000', name: 'web-development', merchantID: '1' },
      { id: '6', description: 'ecommerce', colourHex: '#00FF00', name: 'ecommerce', merchantID: '1' },
      { id: '11', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '6',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 11)),
    contact: {
      name: 'Ava Wilson',
      email: 'ava.wilson@email.co.uk',
    },
    amount: 1500,
    currency: Currency.GBP,
    tags: [
      { id: '7', description: 'web-development', colourHex: '#FF0000', name: 'web-development', merchantID: '1' },
      { id: '6', description: 'ecommerce', colourHex: '#00FF00', name: 'ecommerce', merchantID: '1' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '7',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
    contact: {
      name: 'Emily Brown',
      email: 'emily.brown@email.co.uk',
    },
    amount: 1200,
    currency: Currency.GBP,
    tags: [
      { id: '12', name: 'SEO', merchantID: '1', colourHex: '#000000', description: 'Search Engine Optimization' },
      { id: '13', name: 'content-creation', merchantID: '1', colourHex: '#000000', description: 'Content Creation' },
      { id: '14', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '8',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    contact: {
      name: 'Giuseppe Bianchi',
      email: 'giuseppe.bianchi@email.it',
    },
    amount: 2300,
    currency: Currency.EUR,
    tags: [
      { id: '15', name: 'web-design', merchantID: '1', colourHex: '#000000', description: 'Web Design' },
      { id: '16', name: 'responsive-design', merchantID: '1', colourHex: '#000000', description: 'Responsive Design' },
      { id: '17', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '9',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
    contact: {
      name: 'François Dubois',
      email: 'francois.dubois@email.fr',
    },
    amount: 1000,
    currency: Currency.EUR,
    tags: [
      { id: '18', name: 'logo-design', merchantID: '1', colourHex: '#000000', description: 'Logo Design' },
      { id: '19', name: 'branding', merchantID: '1', colourHex: '#000000', description: 'Branding' },
      { id: '20', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '10',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 22)),
    contact: {
      name: 'Isabella Lewis',
      email: 'isabella.lewis@email.co.uk',
    },
    amount: 3500,
    currency: Currency.GBP,
    tags: [
      { id: '21', name: 'UX-design', merchantID: '1', colourHex: '#000000', description: 'UX Design' },
      { id: '22', name: 'app-development', merchantID: '1', colourHex: '#000000', description: 'App Development' },
      { id: '23', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '11',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    contact: {
      name: 'Lily Taylor',
      email: 'lily.taylor@email.co.uk',
    },
    amount: 4200,
    currency: Currency.GBP,
    tags: [
      { id: '24', name: 'web-design', merchantID: '1', colourHex: '#000000', description: 'Web Design' },
      { id: '25', name: 'branding', merchantID: '1', colourHex: '#000000', description: 'Branding' },
      { id: '26', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
  {
    id: '12',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    contact: {
      name: 'Maria Silva',
      email: 'maria.silva@email.pt',
    },
    amount: 2200,
    currency: Currency.EUR,
    tags: [
      { id: '27', name: 'UI-design', merchantID: '1', colourHex: '#000000', description: 'UI Design' },
      { id: '28', name: 'app-development', merchantID: '1', colourHex: '#000000', description: 'App Development' },
      { id: '29', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
  },
];

export default {
  fewPaymentRequests,
  paymentRequest: {
    regular,
    noShippingAddress,
    partiallyPaidPaymentRequest,
    unpaidPaymentRequest,
    overpaidPaymentRequest,
  },
  merchantTags: mockMerchantTags,
};
