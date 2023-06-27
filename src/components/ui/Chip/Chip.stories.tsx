import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Chip from './Chip';

export default {
  title: 'UI/Chip',
  component: Chip,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  label: 'Tag 1',
};

export const RowOfTags = Template.bind({});
RowOfTags.argTypes = {
  label: { control: { disable: true } },
};

RowOfTags.decorators = [
  () => (
    <div className="space-x-1">
      <Chip {...(RowOfTags.args, { label: 'Tag 1' })} />
      <Chip {...(RowOfTags.args, { label: 'Another tag' })} />
      <Chip {...(RowOfTags.args, { label: 'Third tag' })} />
    </div>
  ),
];
