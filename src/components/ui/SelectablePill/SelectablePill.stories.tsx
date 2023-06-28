import SelectablePill from './SelectablePill';
import { Meta, StoryFn } from '@storybook/react';
import React, { FormEventHandler, useState } from 'react';

export default {
  title: 'UI/Selectable Pill',
  component: SelectablePill,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof SelectablePill>;

const CheckboxTemplate: StoryFn<typeof SelectablePill> = (args) => {
  const [selected, setSelected] = useState<boolean>(false);
  return <SelectablePill {...args} selected={selected} onSelect={setSelected} />;
};

const RadioButtonTemplate: StoryFn<typeof SelectablePill> = (args) => {
  const [selected, setSelected] = useState<string>('');

  const onOptionChange = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="flex space-x-2">
      <SelectablePill {...args} value="1" selected={selected === '1'} onValueChange={onOptionChange} />
      <SelectablePill {...args} value="2" selected={selected === '2'} onValueChange={onOptionChange} />
      <SelectablePill {...args} value="3" selected={selected === '3'} onValueChange={onOptionChange} />
    </div>
  );
};

export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {
  label: 'Name of tag',
};

export const RadioButton = RadioButtonTemplate.bind({});
RadioButton.args = {
  label: 'Name of tag',
  groupName: 'group1',
};
