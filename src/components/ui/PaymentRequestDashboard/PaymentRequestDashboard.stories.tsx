import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import PaymentRequestDashboard from './PaymentRequestDashboard';
import { apiUrls } from '../../../utils/constants';

export default {
  title: 'Functional/PaymentRequestDashboard',
  component: PaymentRequestDashboard,
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
} as ComponentMeta<typeof PaymentRequestDashboard>;

const Template: ComponentStory<typeof PaymentRequestDashboard> = (args) => <PaymentRequestDashboard {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  token: 'Enter merchant token...',
  apiUrl: apiUrls.sandbox,
};
