import React, { useState } from 'react';
import PaymentRequestFilterRow from './PaymentRequestFilterRow';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'UI/Payment Request Filter Row',
  component: PaymentRequestFilterRow,
} as Meta<typeof PaymentRequestFilterRow>;

const Template: StoryFn<typeof PaymentRequestFilterRow> = (args) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [currency, setCurrency] = React.useState<string | undefined>();
  const [minAmount, setMinAmount] = React.useState<number | undefined>();
  const [maxAmount, setMaxAmount] = React.useState<number | undefined>();

  const setDateRange = (dateRange: any) => {
    console.log(dateRange);
  };

  return (
    <PaymentRequestFilterRow
      {...args}
      setDateRange={setDateRange}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
      currency={currency}
      setCurrency={setCurrency}
      minAmount={minAmount}
      setMinAmount={setMinAmount}
      maxAmount={maxAmount}
      setMaxAmount={setMaxAmount}
    />
  );
};

export const Default = Template.bind({});
