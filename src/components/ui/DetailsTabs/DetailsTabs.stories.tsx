import { Meta, StoryFn } from '@storybook/react';
import DetailsTabs from './DetailsTabs';

export default {
  title: 'UI/Details Tabs',
  component: DetailsTabs,
} as Meta<typeof DetailsTabs>;

const Template: StoryFn<typeof DetailsTabs> = (args) => <DetailsTabs {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {};
