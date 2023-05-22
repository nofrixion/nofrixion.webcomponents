import { StoryFn, Meta } from '@storybook/react';

import PaymentInfo from './PaymentInfo';
import {
  AddressType,
  CardTokenCreateModes,
  Currency,
  PartialPaymentMethods,
  PaymentProcessor,
  PaymentResult,
} from '../../../api/types/Enums';

export default {
  title: 'UI/PaymentInfo',
  component: PaymentInfo,
} as Meta<typeof PaymentInfo>;

const Template: StoryFn<typeof PaymentInfo> = (args) => <PaymentInfo {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequest: {
    id: 'fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
    merchantID: 'bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d',
    amount: 10.0,
    currency: Currency.EUR,
    customerID: 'acmecus17022023',
    paymentMethodTypes: 'card, pisp, applePay, googlePay',
    pispAccountID: '72a61bc5-e1bf-4cba-961b-b3757ae8873a',
    baseOriginUrl: 'https://api-dev.nofrixion.com',
    cardTokenCreateModes: CardTokenCreateModes.None,
    callbackUrl: 'https://api-dev.nofrixion.com/pay/result/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
    cardAuthorizeOnly: false,
    cardCreateToken: false,
    ignoreAddressVerification: false,
    cardIgnoreCVN: false,
    paymentProcessor: PaymentProcessor.CyberSource,
    addresses: [
      {
        id: 'b6aecce0-af29-4903-944d-08db5aaaf1b6',
        paymentRequestID: 'ee46cf93-e010-4ed7-88f4-ca53787facff',
        addressType: AddressType.Shipping,
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
    pispRecipientReference: 'pispOJ7SRwlX2wg75',
    status: PaymentResult.None,
    hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
    partialPaymentMethod: PartialPaymentMethods.None,
    inserted: new Date('2023-05-17T19:02:37.8484876+00:00'),
    insertedSortable: '2023-05-17 19:02:37Z',
    lastUpdated: new Date('2023-05-17T19:02:37.8475289+00:00'),
    useHostedPaymentPage: false,
    tags: [],
  },
};

export const NoShippingAddress = Template.bind({});
NoShippingAddress.args = {
  paymentRequest: {
    id: '5cb6f5c8-ce16-411f-9f55-29fb022bb444',
    merchantID: 'bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d',
    amount: 285.0,
    currency: Currency.EUR,
    customerID: 'acmecus17022023',
    paymentMethodTypes: 'pisp, applePay, googlePay',
    pispAccountID: '72a61bc5-e1bf-4cba-961b-b3757ae8873a',
    baseOriginUrl: 'https://api-dev.nofrixion.com',
    cardTokenCreateModes: CardTokenCreateModes.None,
    callbackUrl: 'https://api-dev.nofrixion.com/pay/result/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
    cardAuthorizeOnly: false,
    cardCreateToken: false,
    ignoreAddressVerification: false,
    cardIgnoreCVN: false,
    paymentProcessor: PaymentProcessor.CyberSource,
    addresses: [],
    pispRecipientReference: 'pispOJ7SRwlX2wg75',
    status: PaymentResult.None,
    hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
    partialPaymentMethod: PartialPaymentMethods.None,
    inserted: new Date('2022-04-22T19:02:37.8484876+00:00'),
    insertedSortable: '2023-05-17 19:02:37Z',
    lastUpdated: new Date('2023-05-17T19:02:37.8475289+00:00'),
    useHostedPaymentPage: false,
    tags: [],
  },
};
