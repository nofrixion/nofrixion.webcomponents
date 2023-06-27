import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Select, { SelectOption } from './Select';

export default {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    options: {
      control: {
        type: 'array',
      },
    },
    selected: {
      control: {
        type: 'select',
        options: ['Revolut', 'Fineco', 'Bank of Ireland', 'NoFrixion', 'AIB'],
      },
    },
    onChange: {
      action: 'Changed',
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  const [selected, setSelected] = useState<SelectOption>(args.options[0]);

  const onChangeValue = (value: SelectOption) => {
    setSelected(value);
  };

  return (
    <>
      <Select {...args} selected={selected} onChange={onChangeValue} />
    </>
  );
};

export const Showcase = Template.bind({});

const banksOptions = [
  {
    value: '1',
    label: 'Revolut',
  },
  {
    value: '2',
    label: 'Fineco',
  },
  {
    value: '3',
    label: 'Bank of Ireland',
  },
  {
    value: '4',
    label: 'NoFrixion',
  },
  {
    value: '5',

    label: 'AIB',
  },
];

Showcase.args = {
  options: banksOptions,
};
