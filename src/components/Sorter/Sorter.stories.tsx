import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Sorter, { SortEvent } from './Sorter';

export default {
  title: 'Sorter',
  component: Sorter,
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof Sorter>;

const Template: ComponentStory<typeof Sorter> = (args) => <Sorter {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  name: 'Status',
  onSort: action('Sort Changed'),
};

export const RowOfColumnHeaders = Template.bind({});

RowOfColumnHeaders.args = {
  name: 'Status',
  onSort: action('Sort Changed'),
};

RowOfColumnHeaders.decorators = [
  () => (
    <div className="space-x-1 grid grid-flow-col">
      <Sorter name={'Status'} onSort={action('Sort Changed')} />
      <Sorter name={'Created'} onSort={action('Sort Changed')} />
      <Sorter name={'Contact'} onSort={action('Sort Changed')} />
    </div>
  ),
];
