import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ColumnHeader, { SortEvent } from './ColumnHeader';

export default {
  title: 'ColumnHeader',
  component: ColumnHeader,
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof ColumnHeader>;

const Template: ComponentStory<typeof ColumnHeader> = (args) => <ColumnHeader {...args} />;

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
      <ColumnHeader name={'Status'} onSort={action('Sort Changed')} />
      <ColumnHeader name={'Created'} onSort={action('Sort Changed')} />
      <ColumnHeader name={'Contact'} onSort={action('Sort Changed')} />
    </div>
  ),
];
