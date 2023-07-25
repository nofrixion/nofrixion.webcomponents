import { StoryFn, Meta } from '@storybook/react';

import { SelectDateRange, type TDateRangeOptions } from '@/components/ui/molecules';
import { useState } from 'react';

export default {
  title: 'Molecules/Date selector',
  component: SelectDateRange,
  argTypes: {},
} as Meta<typeof SelectDateRange>;

const Template: StoryFn<typeof SelectDateRange> = ({ onValueChange, ...args }) => {
  const [dateRange, setDateRange] = useState<TDateRangeOptions | undefined>('last7Days');

  const handleOnValueChange = (value: TDateRangeOptions) => {
    setDateRange(value);
    onValueChange && onValueChange(value);
  };

  return <SelectDateRange value={dateRange} onValueChange={handleOnValueChange} {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  // variant: 'paid',
};
