import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentRequestActionMenu from './PaymentRequestActionMenu';

export default {
  title: 'PaymentRequestActionMenu',
  component: PaymentRequestActionMenu,
} as ComponentMeta<typeof PaymentRequestActionMenu>;

const Template: ComponentStory<typeof PaymentRequestActionMenu> = (args) => <PaymentRequestActionMenu {...args} />;

export const WithEdit = Template.bind({});
WithEdit.args = {
  onEdit: () => {
    alert('You clicked Edit!');
  },
};

export const WithDelete = Template.bind({});
WithDelete.args = {
  onDelete: () => {
    alert('You clicked Delete!');
  },
};

export const WithEditAndDelete = Template.bind({});
WithEditAndDelete.args = {
  onEdit: () => {
    alert('You clicked Edit!');
  },
  onDelete: () => {
    alert('You clicked Delete!');
  },
};
