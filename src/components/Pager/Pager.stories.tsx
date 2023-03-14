import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pager from './Pager';

export default {
  title: 'Pager',
  component: Pager,
  argTypes: {
    pageSize: { control: 'number' },
    totalRecords: { control: 'number' },
  },
} as ComponentMeta<typeof Pager>;

const Template: ComponentStory<typeof Pager> = (args) => <Pager {...args} />;

export const Primary = Template.bind({});
