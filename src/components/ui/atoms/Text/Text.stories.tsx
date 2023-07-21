import { StoryFn, Meta } from '@storybook/react';

import { Text } from '@/components/ui/atoms';

export default {
  title: 'Atoms/Text',
  component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const H1 = Template.bind({});
H1.args = {
  children: "I'm an H1",
};
