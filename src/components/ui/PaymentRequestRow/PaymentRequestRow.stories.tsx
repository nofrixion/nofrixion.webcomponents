import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PaymentRequestRow from './PaymentRequestRow';

export default {
  title: 'UI/Payment Request Row',
  component: PaymentRequestRow,
  argTypes: {
    status: {
      control: {
        type: 'inline-radio',
        options: ['paid', 'partial', 'unpaid'],
      },
    },
    createdAt: {
      control: {
        type: 'date',
      },
    },
    contact: {
      control: {
        type: 'object',
      },
    },
    amount: {
      control: {
        type: 'number',
      },
    },
    currency: {
      control: {
        type: 'inline-radio',
        options: ['EUR', 'GBP'],
      },
    },
    tags: {
      control: {
        type: 'object',
      },
    },
    onClick: {
      action: 'Row clicked',
    },
    onDuplicate: {
      action: 'Duplicate selected',
    },
    onCopyLink: {
      action: 'Copy selected',
    },
    onDelete: {
      action: 'Delete selected',
    },
  },
  decorators: [
    (Story) => (
      // This is needed in order to show the row in the canvas
      // as the Row component is a table row
      // We could change this in the future to use a <Table> component
      <table className="table-fixed text-left w-full">
        <thead className="opacity-20">
          <tr className="[&>th]:pl-4">
            <th className="w-28">Status</th>
            <th className="w-32">Created</th>
            <th className="w-40">Contact</th>
            <th className="w-36 text-right">Amount</th>

            {/* Currency */}
            <th className="w-20"></th>

            {/* Tags */}
            <th className="pr-2"></th>

            {/* Menu */}
            <th className="pr-2 w-8"></th>
          </tr>
        </thead>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
} as Meta<typeof PaymentRequestRow>;

const Template: StoryFn<typeof PaymentRequestRow> = (args) => <PaymentRequestRow {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  status: 'paid',
  createdAt: new Date(),
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 29,
  currency: 'EUR',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }, { name: 'Third tag' }],
};

export const ExampleToday = Template.bind({});
ExampleToday.args = {
  status: 'paid',
  createdAt: new Date(),
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 29,
  currency: 'EUR',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }],
};

export const ExampleYesterday = Template.bind({});
ExampleYesterday.args = {
  status: 'partial',
  createdAt: new Date().setDate(new Date().getDate() - 1), // Yesterday
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 115949,
  currency: 'EUR',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }],
};

export const ExampleTwoDaysAgo = Template.bind({});
ExampleTwoDaysAgo.args = {
  status: 'paid',
  createdAt: new Date().setDate(new Date().getDate() - 2), // 2 days ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 115.5,
  currency: 'EUR',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }],
};

export const ExampleTwoYearsAgo = Template.bind({});
ExampleTwoYearsAgo.args = {
  status: 'paid',
  createdAt: new Date().setFullYear(new Date().getFullYear() - 2), // 2 years ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 89.99,
  currency: 'GBP',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }],
};

export const ExampleGBP = Template.bind({});
ExampleGBP.args = {
  status: 'unpaid',
  createdAt: new Date().setMonth(new Date().getMonth() - 2), // 2 months ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 89.99,
  currency: 'GBP',
  tags: [{ name: 'Tag 1' }, { name: 'Another tag' }],
};
