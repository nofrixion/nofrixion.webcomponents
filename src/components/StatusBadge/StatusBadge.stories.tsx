import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StatusBadge from './StatusBadge';
import { StatusBadgeProps } from '@storybook/addon-interactions/dist/ts3.9/components/StatusBadge/StatusBadge';

const statuses = {
  unpaid: 'Unpaid',
  partial: 'Partial',
  paid: 'Paid',
};

export default {
  title: 'StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: { control: 'inline-radio', options: [statuses.unpaid, statuses.partial, statuses.paid] },
  },
} as ComponentMeta<typeof StatusBadge>;

const Template: ComponentStory<typeof StatusBadge> = (args) => <StatusBadge {...args} />;

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
