import { StoryFn, Meta } from '@storybook/react';

import CreatePaymentRequestPage from './CreatePaymentRequestPage';

export default {
  title: 'UI/CreatePaymentRequestPage',
  component: CreatePaymentRequestPage,
  argTypes: {
    onConfirm: { action: 'onConfirm' },
  },
} as Meta<typeof CreatePaymentRequestPage>;

const Template: StoryFn<typeof CreatePaymentRequestPage> = (args) => <CreatePaymentRequestPage {...args} />;

export const Showcase = Template.bind({});
