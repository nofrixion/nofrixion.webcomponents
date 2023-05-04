import { StoryFn, Meta } from '@storybook/react';

import PaymentMethodsModal from './PaymentMethodsModal';

export default {
  title: 'UI/Payment Methods Modal',
  component: PaymentMethodsModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
  },
} as Meta<typeof PaymentMethodsModal>;

const Template: StoryFn<typeof PaymentMethodsModal> = (args) => <PaymentMethodsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
  value: {
    isBankEnabled: true,
    isCardEnabled: true,
    isWalletEnabled: true,
    isLightningEnabled: false,
    isCaptureFundsEnabled: true,
  },
};
