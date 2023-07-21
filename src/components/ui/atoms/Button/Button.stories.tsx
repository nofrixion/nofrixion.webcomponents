import { StoryFn, Meta } from '@storybook/react';

import { Button } from '@/components/ui/atoms';

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    previousArrow: false,
    nextArrow: false,
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['big', 'medium', 'small', 'x-small'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'primaryDark', 'secondary', 'tertiary', 'text'],
    },
    previousArrow: {
      control: { type: 'boolean' },
    },
    nextArrow: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    onClick: {
      action: 'Clicked',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button className="w-fit" {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  children: 'Create payment request',
  variant: 'primary',
  size: 'big',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Create payment request',
  variant: 'primary',
  size: 'big',
};

Primary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Primary.args, { size: 'big', variant: 'primary' })}>Create payment request</Button>
      <Button {...(Primary.args, { size: 'medium', variant: 'primary' })}>Create payment request</Button>
      <Button {...(Primary.args, { size: 'small', variant: 'primary' })}>Create payment request</Button>
      <Button {...(Primary.args, { size: 'x-small', variant: 'primary' })}>Create payment request</Button>
    </div>
  ),
];

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Settings',
  variant: 'secondary',
};

Secondary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { size: 'big', variant: 'secondary' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'medium', variant: 'secondary' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'small', variant: 'secondary' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'x-small', variant: 'secondary' })}>Settings</Button>
    </div>
  ),
];

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Show more',
  variant: 'tertiary',
  size: 'medium',
};

Tertiary.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { size: 'big', variant: 'tertiary' })}>Show more</Button>
      <Button {...(Secondary.args, { size: 'medium', variant: 'tertiary' })}>Show more</Button>
      <Button {...(Secondary.args, { size: 'small', variant: 'tertiary' })}>Show more</Button>
      <Button {...(Secondary.args, { size: 'x-small', variant: 'tertiary' })}>Show more</Button>
    </div>
  ),
];

export const Text = Template.bind({});
Text.args = {
  children: 'Show more',
  variant: 'tertiary',
  size: 'medium',
};

Text.decorators = [
  () => (
    <div className="space-y-2 flex flex-col w-fit">
      <Button {...(Secondary.args, { size: 'big', variant: 'text' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'medium', variant: 'text' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'small', variant: 'text' })}>Settings</Button>
      <Button {...(Secondary.args, { size: 'x-small', variant: 'text' })}>Settings</Button>
    </div>
  ),
];
