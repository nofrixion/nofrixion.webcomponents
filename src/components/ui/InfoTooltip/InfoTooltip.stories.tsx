import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import InfoTooltip from './InfoTooltip';

export default {
  title: 'UI/Info Tooltip',
  component: InfoTooltip,
} as Meta<typeof InfoTooltip>;

const Template: StoryFn<typeof InfoTooltip> = (args) => <InfoTooltip {...args} />;

export const PriorityBank = Template.bind({});
PriorityBank.args = {
  content:
    'Select a priority bank to set it as the priority bank option for users. This streamlines the payment process by displaying the preferred bank first.',
};
