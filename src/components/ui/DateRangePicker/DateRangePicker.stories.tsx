import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { dateRanges } from '../../../utils/constants';

import DateRangePicker from './DateRangePicker';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    rangeText: {
      control: {
        type: 'select',
        options: Object.values(dateRanges),
      },
    },
  },
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  rangeText: dateRanges.last90Days,
  onDateChange: action('Date Changed'),
};
