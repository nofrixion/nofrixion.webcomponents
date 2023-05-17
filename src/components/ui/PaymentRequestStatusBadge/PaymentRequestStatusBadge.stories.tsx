import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

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
} as Meta<typeof PaymentRequestStatusBadge>;

const Template: StoryFn<typeof PaymentRequestStatusBadge> = (args) => <PaymentRequestStatusBadge {...args} />;

export const UnpaidBadge = Template.bind({});
UnpaidBadge.args = {
  status: 'unpaid',
};

export const PartiallyPaidBadge = Template.bind({});
PartiallyPaidBadge.args = {
  status: 'partial',
};

export const PaidBadge = Template.bind({});
PaidBadge.args = {
  status: 'paid',
};
