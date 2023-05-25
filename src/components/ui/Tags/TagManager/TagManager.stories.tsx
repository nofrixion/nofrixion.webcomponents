import { StoryFn, Meta } from '@storybook/react';
import TagManager from './TagManager';
import { mockMerchantTags, mockTags } from '../../../../utils/mockedData';

export default {
  title: 'UI/Tags/TagManager',
  component: TagManager,
  argTypes: {
    tags: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof TagManager>;

const Template: StoryFn<typeof TagManager> = (args) => <TagManager {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  tags: mockTags,
  availableTags: mockMerchantTags,
};
