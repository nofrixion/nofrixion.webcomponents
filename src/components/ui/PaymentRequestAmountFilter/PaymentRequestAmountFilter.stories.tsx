import PaymentRequestAmountFilter from './PaymentRequestAmountFilter';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'UI/Payment Request Amount Filter',
  component: PaymentRequestAmountFilter,
} as Meta<typeof PaymentRequestAmountFilter>;

const Template: StoryFn<typeof PaymentRequestAmountFilter> = (args) => {
  const [localCurrency, setLocalCurrency] = React.useState<string | undefined>();
  const [localMinAmount, setLocalMinAmount] = React.useState<number | undefined>();
  const [localMaxAmount, setLocalMaxAmount] = React.useState<number | undefined>();

  return (
    <PaymentRequestAmountFilter
      currency={localCurrency}
      setCurrency={setLocalCurrency}
      minAmount={localMinAmount}
      setMinAmount={setLocalMinAmount}
      maxAmount={localMaxAmount}
      setMaxAmount={setLocalMaxAmount}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
