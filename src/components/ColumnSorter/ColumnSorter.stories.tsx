import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ColumnSorter from './ColumnSorter';

export default {
  title: 'ColumnSorter',
  component: ColumnSorter,
  argTypes: {
    name: { control: 'number' },
  },
} as ComponentMeta<typeof ColumnSorter>;

const Template: ComponentStory<typeof ColumnSorter> = (args) => <ColumnSorter {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  name: 'Status',
  onSort: action('Sort Changed'),
};
