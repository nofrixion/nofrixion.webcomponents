import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pager from './Pager';

export default {
  title: 'UI/Pager',
  component: Pager,
  argTypes: {
    pageSize: { control: 'number' },
    totalRecords: { control: 'number' },
  },
} as ComponentMeta<typeof Pager>;

const Template: ComponentStory<typeof Pager> = (args) => <Pager {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  pageSize: 20,
  totalRecords: 100,
  onPageChange: action('Page Changed'),
};

export const OneFiftyItems = Template.bind({});

OneFiftyItems.args = {
  pageSize: 20,
  totalRecords: 150,
  onPageChange: action('Page Changed'),
};

export const OneThousandAndSeventySevenItems = Template.bind({});

OneThousandAndSeventySevenItems.args = {
  pageSize: 43,
  totalRecords: 1077,
  onPageChange: action('Page Changed'),
};

export const PageSizeLargerThanTotalRecords = Template.bind({});

PageSizeLargerThanTotalRecords.args = {
  pageSize: 43,
  totalRecords: 23,
  onPageChange: action('Page Changed'),
};
