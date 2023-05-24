import { StoryFn, Meta } from '@storybook/react';
import Transactions from './Transactions';
import { mockPaymentAttempts } from '../../../utils/mockedData';

export default {
  title: 'UI/Transactions',
  component: Transactions,
  argTypes: {
    onRefundClicked: { action: 'refund clicked' },
  },
} as Meta<typeof Transactions>;

const Template: StoryFn<typeof Transactions> = (args) => <Transactions {...args} />;
export const Showcase = Template.bind({});
Showcase.args = {
  transactions: mockPaymentAttempts,
};
