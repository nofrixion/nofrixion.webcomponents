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
  apiUrl: apiUrls.sandbox,
};

export default meta;
