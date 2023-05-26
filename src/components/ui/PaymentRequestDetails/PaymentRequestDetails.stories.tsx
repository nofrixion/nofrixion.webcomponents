import { StoryFn, Meta } from '@storybook/react';
import mockedData from '../../../utils/mockedData';
import PaymentRequestDetails from './PaymentRequestDetails';

export default {
  title: 'UI/PaymentRequestDetails',
  component: PaymentRequestDetails,
  argTypes: {
    onRefundClick: { action: 'refund clicked' },
    onTagAdded: { action: 'tag added' },
  },
} as Meta<typeof PaymentRequestDetails>;

const Template: StoryFn<typeof PaymentRequestDetails> = (args) => (
  <div className="w-[37.5rem]">
    <PaymentRequestDetails {...args} />
  </div>
);
export const FullyPaid = Template.bind({});
FullyPaid.args = {
  paymentRequest: mockedData.paymentRequest.regular,
  merchantTags: mockedData.merchantTags,
};

export const PartiallyPaidPaymentRequest = Template.bind({});
PartiallyPaidPaymentRequest.args = {
  paymentRequest: mockedData.paymentRequest.partiallyPaidPaymentRequest,
  merchantTags: mockedData.merchantTags,
};

export const UnpaidPaymentRequest = Template.bind({});
UnpaidPaymentRequest.args = {
  paymentRequest: mockedData.paymentRequest.unpaidPaymentRequest,
  merchantTags: mockedData.merchantTags,
};

export const OverpaidPaymentRequest = Template.bind({});
OverpaidPaymentRequest.args = {
  paymentRequest: mockedData.paymentRequest.overpaidPaymentRequest,
  merchantTags: mockedData.merchantTags,
};
