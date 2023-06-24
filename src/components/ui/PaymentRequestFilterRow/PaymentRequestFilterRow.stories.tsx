import { useState } from 'react';
import PaymentRequestFilterRow from './PaymentRequestFilterRow';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'UI/Payment Request Filter Row',
  component: PaymentRequestFilterRow,
} as Meta<typeof PaymentRequestFilterRow>;

const Template: StoryFn<typeof PaymentRequestFilterRow> = (args) => {
  const [searchFilter, setSearchFilter] = useState<string>('');

  const setDateRange = (dateRange: any) => {
    console.log(dateRange);
  };

  return (
    <PaymentRequestFilterRow
      {...args}
      setDateRange={setDateRange}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
    />
  );
};

export const Default = Template.bind({});
