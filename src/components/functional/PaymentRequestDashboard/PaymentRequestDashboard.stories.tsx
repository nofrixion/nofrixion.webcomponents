import { Meta, StoryFn } from '@storybook/react';
import PaymentRequestDashboard from './PaymentRequestDashboard';
import { apiUrls } from '../../../utils/constants';

const meta: Meta<typeof PaymentRequestDashboard> = {
  title: 'Functional/PaymentRequestDashboard',
  component: PaymentRequestDashboard,
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: { type: 'select' },
      options: Object.values(apiUrls),
    },
    merchantId: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof PaymentRequestDashboard>;

const Template: StoryFn<typeof PaymentRequestDashboard> = (args) => <PaymentRequestDashboard {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  token: 'Enter user token...',
  apiUrl: apiUrls.sandbox,
  merchantId: 'Enter merchant id...',
};

export default meta;
