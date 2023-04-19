import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import InputAmountField, { InputAmountFieldProps } from './InputAmountField';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof InputAmountField> = {
  title: 'UI/InputAmountField',
  component: InputAmountField,
  argTypes: {
    value: { control: { type: 'text' } },
    currency: {
      options: ['EUR', 'GBP'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn<InputAmountFieldProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  return <InputAmountField {...args} value={localValue} onChange={onChangeInput} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  value: '1222.99',
  currency: 'EUR',
  onCurrencyChange: action('Currency changed'),
};

export const GBPInput = Template.bind({});

GBPInput.args = {
  value: '27.50',
  currency: 'GBP',
  onCurrencyChange: action('Currency changed'),
};

export default meta;
