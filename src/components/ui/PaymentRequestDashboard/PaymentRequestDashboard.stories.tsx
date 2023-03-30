import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import PaymentRequestDashboard from './PaymentRequestDashboard';
export default {
  title: 'UI/PaymentRequestDashboard',
  component: PaymentRequestDashboard,
  argTypes: {
    totalRecords: { control: 'number' },
  },
} as ComponentMeta<typeof PaymentRequestDashboard>;

const Template: ComponentStory<typeof PaymentRequestDashboard> = (args) => <PaymentRequestDashboard />;

export const Showcase = Template.bind({});

Showcase.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 233,
  selected: true,
  onSelect: action('Tab Changed'),
};
