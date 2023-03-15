import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StatusBadge from './StatusBadge';

export default {
  title: 'StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: { control: 'inline-radio', options: ['UNPAID', 'PARTIAL', 'PAID'] },
  },
} as ComponentMeta<typeof StatusBadge>;

const Template: ComponentStory<typeof StatusBadge> = (args) => <StatusBadge {...args} />;

export const UnpaidBadge = Template.bind({});
UnpaidBadge.args = {
  status: 'UNPAID',
};

export const PartiallyPaidBadge = Template.bind({});
PartiallyPaidBadge.args = {
  status: 'PARTIAL',
};

export const PaidBadge = Template.bind({});
PaidBadge.args = {
  status: 'PAID',
};
