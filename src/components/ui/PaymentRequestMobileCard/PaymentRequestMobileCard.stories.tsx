import { StoryFn, Meta } from '@storybook/react';

import PaymentRequestMobileCard from './PaymentRequestMobileCard';
import { Currency } from '@nofrixion/moneymoov';

const tags = [
  {
    id: '1',
    merchantID: '1',
    name: 'Tag 1',
    colourHex: '#FF0000',
    description: 'This is a tag',
  },
  {
    id: '2',
    merchantID: '1',
    name: 'Another tag',
    colourHex: '#00FF00',
    description: 'This is another tag',
  },
  {
    id: '3',
    merchantID: '1',
    name: 'Third tag',
    colourHex: '#0000FF',
    description: 'This is a third tag',
  },
];

export default {
  title: 'UI/Payment Request Mobile Card',
  component: PaymentRequestMobileCard,
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
} as Meta<typeof PaymentRequestMobileCard>;

const Template: StoryFn<typeof PaymentRequestMobileCard> = (args) => <PaymentRequestMobileCard {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  status: 'paid',
  createdAt: new Date(),
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 29,
  currency: Currency.EUR,
  tags: tags,
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
  currency: Currency.EUR,
  tags: tags,
};

export const ExampleYesterday = Template.bind({});
ExampleYesterday.args = {
  status: 'partial',
  createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 115949,
  currency: Currency.EUR,
  tags: tags,
};

export const ExampleTwoDaysAgo = Template.bind({});
ExampleTwoDaysAgo.args = {
  status: 'paid',
  createdAt: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 115.5,
  currency: Currency.EUR,
  tags: tags,
};

export const ExampleTwoYearsAgo = Template.bind({});
ExampleTwoYearsAgo.args = {
  status: 'paid',
  createdAt: new Date(new Date().setFullYear(new Date().getFullYear() - 2)), // 2 years ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 89.99,
  currency: Currency.GBP,
  tags: tags,
};

export const ExampleGBP = Template.bind({});
ExampleGBP.args = {
  status: 'unpaid',
  createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)), // 2 months ago
  contact: {
    name: 'Daniel Kowalski',
    email: 'dkowalski@email.com',
  },
  amount: 89.99,
  currency: Currency.GBP,
  tags: tags,
};
