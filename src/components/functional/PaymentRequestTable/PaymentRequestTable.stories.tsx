import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof PaymentRequestTable>;

const Template: ComponentStory<typeof PaymentRequestTable> = (args) => <PaymentRequestTable {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  apiUrl: apiUrls.sandbox,
};
