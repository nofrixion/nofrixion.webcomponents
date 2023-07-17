import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['big', 'medium', 'small', 'xsmall'],
    },
    type: {
      control: { type: 'radio' },
      options: ['primary', 'primaryDark', 'secondary', 'tertiary', 'text'],
    },
    previousArrow: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    nextArrow: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return (
    <div className="px-2 pt-2 w-fit">
      <Button {...args} />
    </div>
  );
};

export const Showcase = Template.bind({});
Showcase.args = {
  label: 'Create payment request',
  type: 'primary',
  size: 'big',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Create payment request',
  type: 'primary',
  size: 'big',
};

Primary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Primary.args, { label: 'Create payment request', size: 'big' })} />
      <Button {...{ label: 'Create payment request', size: 'medium' }} />
      <Button {...{ label: 'Create payment request', size: 'small' }} />
      <Button {...{ label: 'Create payment request', size: 'xsmall' }} />
    </div>
  ),
];

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Settings',
  type: 'secondary',
};

Secondary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { label: 'Settings', size: 'big', type: 'secondary' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'medium', type: 'secondary' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'small', type: 'secondary' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'xsmall', type: 'secondary' })} />
    </div>
  ),
];

export const Tertiary = Template.bind({});
Tertiary.args = {
  label: 'Show more',
  type: 'tertiary',
  size: 'medium',
};

Tertiary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { label: 'Show more', size: 'big', type: 'tertiary' })} />
      <Button {...(Secondary.args, { label: 'Show more', size: 'medium', type: 'tertiary' })} />
      <Button {...(Secondary.args, { label: 'Show more', size: 'small', type: 'tertiary' })} />
      <Button {...(Secondary.args, { label: 'Show more', size: 'xsmall', type: 'tertiary' })} />
    </div>
  ),
];

export const Text = Template.bind({});
Text.args = {
  label: 'Show more',
  type: 'tertiary',
  size: 'medium',
};

Text.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { label: 'Settings', size: 'big', type: 'text' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'medium', type: 'text' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'small', type: 'text' })} />
      <Button {...(Secondary.args, { label: 'Settings', size: 'xsmall', type: 'text' })} />
    </div>
  ),
];
