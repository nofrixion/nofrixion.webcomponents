import { StoryFn, Meta } from '@storybook/react';

import TagManager from './TagManager';

const tags = [
  {
    ID: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag 1',
  },
  {
    ID: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag 2',
  },
  {
    ID: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag 3',
  },
  {
    ID: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'B tag 1',
  },
  {
    ID: '5',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'B tag 2',
  },
  {
    ID: '6',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'B tag 3',
  },
  {
    ID: '7',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'C tag 1',
  },
  {
    ID: '8',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'C tag 2',
  },
  {
    ID: '9',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'C tag 3',
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

const Template: StoryFn<typeof TagManager> = (args) => {
  const onDeleted = (tagID: string) => {
    // tags.splice(
    //   tags.findIndex((tag) => tag.ID === tagID),
    //   1,
    // );
    // console.log(tags);
  };

  return <TagManager {...args} tags={tags} onDelete={onDeleted} />;
};

export const Regular = Template.bind({});
Regular.args = {
  tags: tags,
};
