import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import InputTextAreaField, { InputTextAreaFieldProps } from './InputTextAreaField';

export default {
  title: 'UI/InputTextAreaField',
  component: InputTextAreaField,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof InputTextAreaField>;

const Template: StoryFn<InputTextAreaFieldProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value);

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return <InputTextAreaField {...args} value={localValue} onChange={onChangeInput} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  label: 'Description',
  value: 'Some description',
  optional: false,
  maxLength: 140,
};

export const AnotherDescriptionOptional = Template.bind({});

AnotherDescriptionOptional.args = {
  label: 'Another Description',
  value: 'Jimbo',
  optional: true,
  maxLength: 140,
};

export const MaxLength50 = Template.bind({});

MaxLength50.args = {
  label: 'Another Description',
  value: 'Max length is twenty',
  optional: true,
  maxLength: 20,
};
