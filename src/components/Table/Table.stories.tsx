import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from './Table';

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
