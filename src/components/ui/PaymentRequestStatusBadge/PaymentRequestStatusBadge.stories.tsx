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
  size: 'small',
};

export const PartiallyPaidBadge = Template.bind({});
PartiallyPaidBadge.args = {
  status: 'partial',
  size: 'small',
};

export const PaidBadge = Template.bind({});
PaidBadge.args = {
  status: 'paid',
  size: 'small',
};

export const OverPaidBadge = Template.bind({});
OverPaidBadge.args = {
  status: 'overpaid',
  size: 'small',
};

export const LargeUnpaidBadge = Template.bind({});
LargeUnpaidBadge.args = {
  status: 'unpaid',
  size: 'large',
};

export const LargePartiallyPaidBadge = Template.bind({});
LargePartiallyPaidBadge.args = {
  status: 'partial',
  size: 'large',
};

export const LargePaidBadge = Template.bind({});
LargePaidBadge.args = {
  status: 'paid',
  size: 'large',
};

export const LargeOverPaidBadge = Template.bind({});
LargeOverPaidBadge.args = {
  status: 'overpaid',
  size: 'large',
};
