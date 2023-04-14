import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { apiUrls } from '../../../utils/constants';
import PaymentRequestTable from './PaymentRequestTable';

export default {
  title: 'Functional/Payment Request Table',
  component: PaymentRequestTable,
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: {
        type: 'select',
        options: Object.values(apiUrls),
      },
    },
  },
} as Meta<typeof PaymentRequestTable>;

const Template: StoryFn<typeof PaymentRequestTable> = (args) => <PaymentRequestTable {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  apiUrl: apiUrls.sandbox,
};
