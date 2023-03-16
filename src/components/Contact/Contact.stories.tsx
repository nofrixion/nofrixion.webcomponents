import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Contact from './Contact';

export default {
  title: 'Contact',
  component: Contact,
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
  },
} as ComponentMeta<typeof Contact>;

const Template: ComponentStory<typeof Contact> = (args) => <Contact {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'Daniel Kowalski',
  email: 'dkowalski@email.com',
};
