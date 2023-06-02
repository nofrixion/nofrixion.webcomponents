import { StoryFn, Meta } from '@storybook/react';

import PaymentNotificationsModal from './PaymentNotificationsModal';

export default {
  title: 'UI/Payment Notifications Modal',
  component: PaymentNotificationsModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
  },
} as Meta<typeof PaymentNotificationsModal>;

const Template: StoryFn<typeof PaymentNotificationsModal> = (args) => <PaymentNotificationsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
};
