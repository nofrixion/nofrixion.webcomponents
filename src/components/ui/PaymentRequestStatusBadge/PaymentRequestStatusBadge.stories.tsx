import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentRequestStatusBadge from './PaymentRequestStatusBadge';

const statuses = {
  unpaid: 'unpaid',
  partial: 'partial',
  paid: 'paid',
};

export default {
  title: 'UI/Payment Request Status Badge',
  component: PaymentRequestStatusBadge,
  argTypes: {
    status: { control: 'inline-radio', options: Object.values(statuses) },
  },
} as ComponentMeta<typeof PaymentRequestStatusBadge>;

const Template: ComponentStory<typeof PaymentRequestStatusBadge> = (args) => <PaymentRequestStatusBadge {...args} />;

export const UnpaidBadge = Template.bind({});
UnpaidBadge.args = {
  status: statuses.unpaid,
};

export const PartiallyPaidBadge = Template.bind({});
PartiallyPaidBadge.args = {
  status: statuses.partial,
};

export const PaidBadge = Template.bind({});
PaidBadge.args = {
  status: statuses.paid,
};
