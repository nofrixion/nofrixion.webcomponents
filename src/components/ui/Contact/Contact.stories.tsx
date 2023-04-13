import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Contact from './Contact';

export default {
  title: 'UI/Contact',
  component: Contact,
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
  },
} as Meta<typeof Contact>;

const Template: StoryFn<typeof Contact> = (args) => <Contact {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'Daniel Kowalski',
  email: 'dkowalski@email.com',
};
