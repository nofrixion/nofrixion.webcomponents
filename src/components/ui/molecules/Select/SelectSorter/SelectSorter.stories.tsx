import { StoryFn, Meta } from '@storybook/react';

import { SelectSorter, type TSorterOptions } from '@/components/ui/molecules';
import { useState } from 'react';

export default {
  title: 'Molecules/Select Sorter',
  component: SelectSorter,
  argTypes: {},
} as Meta<typeof SelectSorter>;

const Template: StoryFn<typeof SelectSorter> = ({ onValueChange, ...args }) => {
  const [dateRange, setDateRange] = useState<TSorterOptions | undefined>('moreRecentFirst');

  const handleOnValueChange = (value: TSorterOptions) => {
    setDateRange(value);
    onValueChange && onValueChange(value);
  };

  return <SelectSorter value={dateRange} onValueChange={handleOnValueChange} {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  // variant: 'paid',
};
