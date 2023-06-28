import PaymentRequestTagFilter, { TagFilter } from './PaymentRequestTagFilter';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'UI/Payment Request Tag Filter',
  component: PaymentRequestTagFilter,
} as Meta<typeof PaymentRequestTagFilter>;

const Template: StoryFn<typeof PaymentRequestTagFilter> = (args) => {
  const [localTags, setLocalTags] = React.useState<TagFilter[]>([
    {
      id: '1',
      label: 'Name of tag',
      isSelected: false,
    },
    {
      id: '2',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '3',
      label: 'Tag 3',
      isSelected: false,
    },
    {
      id: '4',
      label: 'This is another tag',
      isSelected: false,
    },
    {
      id: '5',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '6',
      label: 'Name of tag',
      isSelected: false,
    },
    {
      id: '7',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '8',
      label: 'Tag 3',
      isSelected: false,
    },
    {
      id: '9',
      label: 'This is another tag',
      isSelected: false,
    },
    {
      id: '10',
      label: 'Another tag',
      isSelected: false,
    },
  ]);
  return <PaymentRequestTagFilter tags={localTags} setTags={setLocalTags} />;
};

export const Default = Template.bind({});
Default.args = {};
