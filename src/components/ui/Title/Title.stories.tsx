import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Title from './Title';

export default {
  title: 'UI/Title',
  component: Title,
} as Meta<typeof Title>;

const Template: StoryFn<typeof Title> = (args) => <Title {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
};
