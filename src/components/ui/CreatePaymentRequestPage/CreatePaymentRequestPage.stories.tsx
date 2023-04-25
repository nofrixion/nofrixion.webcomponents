import { StoryFn, Meta } from '@storybook/react';

import CreatePaymentRequestPage from './CreatePaymentRequestPage';

export default {
  title: 'UI/CreatePaymentRequestPage',
  component: CreatePaymentRequestPage,
} as Meta<typeof CreatePaymentRequestPage>;

const Template: StoryFn<typeof CreatePaymentRequestPage> = (args) => <CreatePaymentRequestPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
};
