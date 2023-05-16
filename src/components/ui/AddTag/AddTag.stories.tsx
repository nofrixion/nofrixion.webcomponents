import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Tag from './AddTag';

export default {
  title: 'UI/AddTag',
  component: Tag,
  argTypes: {
    id: { control: 'text' },
    label: { control: { disable: true } },
    onDelete: { action: 'Delete clicked' },
  },
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  label: 'Add tag',
};

export const RowOfTags = Template.bind({});
RowOfTags.argTypes = {
  id: { control: 'text' },
  label: { control: { disable: true } },
  onDelete: { action: 'Delete clicked' },
};

RowOfTags.decorators = [
  () => (
    <div className="space-x-1">
      <Tag {...(RowOfTags.args, { id: '8E31C9B6-E48C-49E6-8642-B8C28F77DFEE', label: 'Tag 1' })} />
      <Tag {...(RowOfTags.args, { id: '305C5034-3657-406E-925D-4F68D9CBAD4E', label: 'Another tag' })} />
      <Tag {...(RowOfTags.args, { id: '59312E48-E50C-496F-A4C2-55245730816C', label: 'Third tag' })} />
    </div>
  ),
];
