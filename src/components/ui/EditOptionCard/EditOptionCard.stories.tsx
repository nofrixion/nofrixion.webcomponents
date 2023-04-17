import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EditOptionCard from './EditOptionCard';

export default {
  title: 'UI/Edit Option Card',
  component: EditOptionCard,
} as Meta<typeof EditOptionCard>;

const Template: StoryFn<typeof EditOptionCard> = (args) => <EditOptionCard {...args} />;

export const PaymentConditions = Template.bind({});
PaymentConditions.args = {
  label: 'Payment conditions',
  value: 'Single payment',
  onClick: action('Clicked'),
};

export const AvailableMethods = Template.bind({});
AvailableMethods.args = {
  label: 'Available methods',
  value: 'Bank and cards',
  onClick: action('Clicked'),
};
