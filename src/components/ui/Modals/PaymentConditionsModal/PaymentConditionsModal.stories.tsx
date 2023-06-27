import { StoryFn, Meta } from '@storybook/react';

import PaymentConditionsModal from './PaymentConditionsModal';

export default {
  title: 'UI/Payment Conditions Modal',
  component: PaymentConditionsModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
  },
} as Meta<typeof PaymentConditionsModal>;

const Template: StoryFn<typeof PaymentConditionsModal> = (args) => <PaymentConditionsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
};
