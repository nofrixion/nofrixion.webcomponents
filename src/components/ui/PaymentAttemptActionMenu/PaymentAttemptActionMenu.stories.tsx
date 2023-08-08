import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import PaymentAttemptActionMenu from './PaymentAttemptActionMenu';

export default {
  title: 'UI/Payment Attempt Action Menu',
  component: PaymentAttemptActionMenu,
  argTypes: {
    onRefund: {
      action: 'Refund selected',
    },
  },
} as Meta<typeof PaymentAttemptActionMenu>;

const Template: StoryFn<typeof PaymentAttemptActionMenu> = (args) => <PaymentAttemptActionMenu {...args} />;

export const ActionMenuTemplate = Template.bind({});
ActionMenuTemplate.args = {};
