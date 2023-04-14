import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import InputTextField, { InputTextFieldProps } from './InputTextField';

export default {
  title: 'UI/InputTextField',
  component: InputTextField,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof InputTextField>;

const Template: StoryFn<InputTextFieldProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value);

  const onChangeInput = (inputValue: string) => {
    setValue(inputValue);
  };

  return <InputTextField {...args} value={localValue} onChangeInput={onChangeInput} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  label: 'Product or service',
  value: 'Some Product or service',
  optional: false,
};

export const FirstNameOptional = Template.bind({});

FirstNameOptional.args = {
  label: 'First name',
  value: 'Jimbo',
  optional: true,
};
