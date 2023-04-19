import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Select from './Select';

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
  const [selected, setSelected] = useState<string>(args.options[0]);

  const onChangeValue = (value: string) => {
    setSelected(value);
  };

  return (
    <>
      <Select {...args} selected={selected} onChange={onChangeValue} />
    </>
  );
};

export const Showcase = Template.bind({});

const banksOptions = ['Revolut', 'Fineco', 'Bank of Ireland', 'NoFrixion', 'AIB'];

Showcase.args = {
  options: banksOptions,
};
