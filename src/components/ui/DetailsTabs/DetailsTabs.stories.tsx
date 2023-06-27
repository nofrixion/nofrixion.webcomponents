import { Meta, StoryFn } from '@storybook/react';
import DetailsTabs from './DetailsTabs';
import mockedData from '../../../utils/mockedData';

export default {
  title: 'UI/Details Tabs',
  component: DetailsTabs,
  argTypes: {
    onRefundClick: { action: 'refund clicked' },
  },
} as Meta<typeof DetailsTabs>;

const Template: StoryFn<typeof DetailsTabs> = (args) => <DetailsTabs {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequest: mockedData.paymentRequest.regular,
};

export const NoShippingAddress = Template.bind({});
NoShippingAddress.args = {
  paymentRequest: mockedData.paymentRequest.noShippingAddress,
};
