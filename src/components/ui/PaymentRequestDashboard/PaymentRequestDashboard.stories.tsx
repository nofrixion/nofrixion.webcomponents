import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
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
  },
} as Meta<typeof PaymentRequestDashboard>;

const Template: StoryFn<typeof PaymentRequestDashboard> = (args) => <PaymentRequestDashboard {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  token: 'Enter merchant token...',
  apiUrl: apiUrls.sandbox,
};

export default meta;
