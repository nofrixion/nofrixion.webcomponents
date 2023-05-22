import { StoryFn, Meta } from '@storybook/react';

import TagManager from './TagManager';

const tags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
];

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
  tags: tags,
};
