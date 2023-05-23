import { StoryFn, Meta } from '@storybook/react';

import TagManager from './TagManager';

const tags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
    disabled: false,
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
    disabled: false,
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
    disabled: false,
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
    disabled: false,
  },
];

const merchantTags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
    disabled: false,
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
    disabled: false,
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
    disabled: false,
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
    disabled: false,
  },
  {
    ID: '5',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 1',
    disabled: false,
  },
  {
    ID: '6',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 2',
    disabled: false,
  },
  {
    ID: '7',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 3',
    disabled: false,
  },
  {
    ID: '8',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 4',
    disabled: false,
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
  availableTags: merchantTags,
};
