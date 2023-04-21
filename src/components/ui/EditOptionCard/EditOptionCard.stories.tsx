import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import EditOptionCard from './EditOptionCard';

export default {
  title: 'UI/Edit Option Card',
  component: EditOptionCard,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    onClick: { action: 'Clicked' },
    details: { control: 'array' },
  },
} as Meta<typeof EditOptionCard>;

const Template: StoryFn<typeof EditOptionCard> = (args) => <EditOptionCard {...args} />;

export const PaymentConditions = Template.bind({});
PaymentConditions.args = {
  label: 'Payment conditions',
  value: 'Single payment',
  details: ['*Bank of Ireland* set up as priority bank.', "Don't capture funds on cards is on."],
};

export const AvailableMethods = Template.bind({});
AvailableMethods.args = {
  label: 'Available methods',
  value: 'Bank and cards',
};