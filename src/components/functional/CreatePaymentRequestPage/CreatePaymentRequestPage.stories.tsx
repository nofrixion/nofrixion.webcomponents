import { StoryFn, Meta } from '@storybook/react';
import { apiUrls } from '../../../utils/constants';
import CreatePaymentRequest from './CreatePaymentRequestPage';

const meta: Meta<typeof CreatePaymentRequest> = {
  title: 'Functional/Create Payment Request',
  component: CreatePaymentRequest,
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
  },
} as Meta<typeof CreatePaymentRequest>;

const Template: StoryFn<typeof CreatePaymentRequest> = (args) => <CreatePaymentRequest {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  merchantId: 'bf9e1828-c6a1-4cc5-a012-...',
  apiUrl: apiUrls.sandbox,
  isOpen: true,
  onClose: () => {},
};

export default meta;
