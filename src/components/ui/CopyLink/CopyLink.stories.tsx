// write a story component for CopyLink component

import { StoryFn, Meta } from '@storybook/react';
import { CopyLink } from './CopyLink';

export default {
  title: 'UI/CopyLink',
  component: CopyLink,
} as Meta<typeof CopyLink>;

const Template: StoryFn<typeof CopyLink> = (args) => {
  return <CopyLink {...args} />;
};

export const Showcase = Template.bind({});
Showcase.args = {
  link: 'https://api-dev.nofrixion.com/nextgen/pay/c4db21c3-17a4-4e3a-8b19-87b4e9c07766',
};
