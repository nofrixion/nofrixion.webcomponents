import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from './Tab';

export default {
  title: 'UI/Tab',
  component: Tab,
  argTypes: {
    totalRecords: { control: 'number' },
  },
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = (args) => <Tab {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 233,
  selected: true,
  onSelect: action('Tab Changed'),
};

export const All = Template.bind({});

All.args = {
  status: PaymentRequestStatus.All,
  totalRecords: 112,
  selected: true,
  onSelect: action('Tab Changed'),
};

export const Unpaid = Template.bind({});

Unpaid.args = {
  status: PaymentRequestStatus.None,
  totalRecords: 112,
  selected: false,
  onSelect: action('Tab Changed'),
};

export const PartiallyPaid = Template.bind({});

PartiallyPaid.args = {
  status: PaymentRequestStatus.PartiallyPaid,
  totalRecords: 89,
  selected: false,
  onSelect: action('Tab Changed'),
};

export const Paid = Template.bind({});

Paid.args = {
  status: PaymentRequestStatus.FullyPaid,
  totalRecords: 47,
  selected: false,
  onSelect: action('Tab Changed'),
};
