import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentRequestActionMenu from './PaymentRequestActionMenu';

export default {
  title: 'Payment Request Row Action Menu',
  component: PaymentRequestActionMenu,
} as ComponentMeta<typeof PaymentRequestActionMenu>;

const Template: ComponentStory<typeof PaymentRequestActionMenu> = (args) => <PaymentRequestActionMenu {...args} />;

export const ActionMenuTemplate = Template.bind({});
ActionMenuTemplate.args = {
  onDuplicate: () => {
    alert('You clicked Duplicate!');
  },
  onCopy: () => {
    alert('You clicked Copy!');
  },
  onDelete: () => {
    alert('You clicked Delete!');
  },
};
