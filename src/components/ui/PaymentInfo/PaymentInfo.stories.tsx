import { StoryFn, Meta } from '@storybook/react';

import PaymentInfo from './PaymentInfo';
import mockedData from '../../../utils/mockedData';

export default {
  title: 'UI/PaymentInfo',
  component: PaymentInfo,
} as Meta<typeof PaymentInfo>;

const Template: StoryFn<typeof PaymentInfo> = (args) => <PaymentInfo {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequest: mockedData.paymentRequest.regular,
};

export const NoShippingAddress = Template.bind({});
NoShippingAddress.args = {
  paymentRequest: mockedData.paymentRequest.noShippingAddress,
};
