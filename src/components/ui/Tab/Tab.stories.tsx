import { Meta, StoryFn } from '@storybook/react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from './Tab';
import * as Tabs from '@radix-ui/react-tabs';

export default {
  title: 'UI/Tab',
  component: Tab,
  argTypes: {
    totalRecords: { control: 'number' },
    isLoading: { control: 'boolean' },
  },
  args: {
    isLoading: false,
  },
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = (args) => {
  return (
    <Tabs.Root onValueChange={() => {}}>
      {/* Keep the Tab to still get accessibility functions through the keyboard */}
      <Tabs.List className="flex shrink-0 gap-x-4 mb-4">
        <Tab {...args}></Tab>
      </Tabs.List>
      <Tabs.Content value=""></Tabs.Content>
    </Tabs.Root>
  );
};

export const Showcase = Template.bind({});

Showcase.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 233,
};

export const All = Template.bind({});

All.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 112,
};

export const AllLoading = Template.bind({});

AllLoading.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 182,
  isLoading: true,
};

export const Unpaid = Template.bind({});

Unpaid.args = {
  status: PaymentRequestStatus.None,
  totalRecords: 112,
};

export const PartiallyPaid = Template.bind({});

PartiallyPaid.args = {
  status: PaymentRequestStatus.PartiallyPaid,
  totalRecords: 89,
};

export const Paid = Template.bind({});

Paid.args = {
  status: PaymentRequestStatus.FullyPaid,
  totalRecords: 47,
};
