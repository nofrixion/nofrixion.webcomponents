import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ColumnHeader from './ColumnHeader';

export default {
  title: 'UI/ColumnHeader',
  component: ColumnHeader,
  argTypes: {
    name: { control: 'text' },
  },
} as ComponentMeta<typeof ColumnHeader>;

const Template: ComponentStory<typeof ColumnHeader> = (args) => <ColumnHeader {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  label: 'Status',
  onSort: action('Sort Changed'),
};

export const RowOfColumnHeaders = Template.bind({});

RowOfColumnHeaders.args = {
  label: 'Status',
  onSort: action('Sort Changed'),
};

RowOfColumnHeaders.decorators = [
  () => (
    <div className="space-x-1 flex justify-between">
      <ColumnHeader label="Status" onSort={action('Status Sort Changed')} />
      <ColumnHeader label="Created" onSort={action('Created Sort Changed')} />
      <ColumnHeader label="Contact" onSort={action('Contact Sort Changed')} />
    </div>
  ),
];
