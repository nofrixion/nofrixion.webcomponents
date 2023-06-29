import { useState } from 'react';
import SearchBar from './SearchBar';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'UI/SearchBar',
  component: SearchBar,
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => {
  const [value, setValue] = useState<string>('');
  return <SearchBar {...args} value={value} setValue={setValue} />;
};

export const Default = Template.bind({});
