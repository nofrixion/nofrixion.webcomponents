import { StoryFn, Meta } from '@storybook/react';

import AddTag from './AddTag';

export default {
  title: 'UI/Tags/AddTag',
  component: AddTag,
  argTypes: {
    id: { control: 'text' },
    label: { control: { disable: true } },
    onTagAdded: { action: 'Tag added' },
  },
} as Meta<typeof AddTag>;

const Template: StoryFn<typeof AddTag> = (args) => <AddTag {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  tags: [
    {
      ID: 'A4A87832-873F-403D-9F08-D8CE40D80B2E',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'A tag 1',
    },
    {
      ID: '197D8B89-B20C-4D4C-A235-E5FD0F324E96',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'A tag 2',
    },
    {
      ID: '4A496AC7-2470-41BC-9FC0-75F69C3DCFEA',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'A tag 3',
    },
    {
      ID: 'F1B82937-291A-44EF-BF93-2500FA587AC6',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'B tag 1',
    },
    {
      ID: '2FE2511D-701C-4D33-A76E-D2612E3381BB',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'B tag 2',
    },
    {
      ID: 'CE6867C0-2F7A-40C9-A15E-8C80B34D42AA',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'B tag 3',
    },
    {
      ID: '02F613B5-F441-45E6-9766-4D6B1251C589',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'C tag 1',
    },
    {
      ID: '8A06F9E6-D787-417B-8BD7-D61E1B333C86',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'C tag 2',
    },
    {
      ID: '5DA53012-3896-4F6E-B2CA-20C44D526D1C',
      merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
      name: 'C tag 3',
    },
  ],
};
