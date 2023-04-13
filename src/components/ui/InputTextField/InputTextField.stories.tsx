import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import InputTextField from './InputTextField';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/InputTextField',
  component: InputTextField,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof InputTextField>;

const Template: StoryFn<typeof InputTextField> = (args) => <InputTextField {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  label: 'Product or service',
  value: 'Some Product or service',
  onChange: action('Product or service changed'),
};

export const FirstNameOptional = Template.bind({});

FirstNameOptional.args = {
  label: 'First name',
  optional: true,
  value: 'Jimbo',
  onChange: action('First name changed'),
};
