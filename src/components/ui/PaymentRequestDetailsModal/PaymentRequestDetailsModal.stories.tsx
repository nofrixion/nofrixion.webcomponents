import { StoryFn, Meta } from '@storybook/react';
import mockedData, { mockPaymentAttempts } from '../../../utils/mockedData';
import PaymentRequestDetailsModal from './PaymentRequestDetailsModal';

export default {
  title: 'UI/PaymentRequestDetailsModal',
  component: PaymentRequestDetailsModal,
  argTypes: {
    onRefundClick: { action: 'refund clicked' },
    onTagAdded: { action: 'tag added' },
  },
} as Meta<typeof PaymentRequestDetailsModal>;

const Template: StoryFn<typeof PaymentRequestDetailsModal> = (args) => (
  <div className="w-[37.5rem]">
    <PaymentRequestDetailsModal {...args} />
  </div>
);
export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequest: mockedData.paymentRequests.regular,
};

export const PartiallyPaidPaymentRequest = Template.bind({});
PartiallyPaidPaymentRequest.args = {
  paymentRequest: mockedData.paymentRequests.partiallyPaidPaymentRequest(),
};
