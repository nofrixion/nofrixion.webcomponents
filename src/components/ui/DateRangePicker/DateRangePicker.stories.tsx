import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { dateRanges } from '../../../utils/constants';

import DateRangePicker from './DateRangePicker';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/DateRangePicker',
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  onDateChange: action('Date Changed'),
};
