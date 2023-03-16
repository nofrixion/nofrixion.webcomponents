import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentRequestTable from './PaymentRequestTable';

const apiUrls = {
  local: 'http://localhost:3000/api/v1',
  dev: 'https://api-dev.nofrixion.com/api/v1',
  sandbox: 'https://api-sandbox.nofrixion.com/api/v1',
  production: 'https://api.nofrixion.com/api/v1',
};

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
