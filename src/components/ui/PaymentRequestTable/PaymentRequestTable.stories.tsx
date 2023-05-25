import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PaymentRequestTable from './PaymentRequestTable';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { Currency } from '../../../api/types/Enums';

const tags = [
  {
    ID: '1',
    merchantID: '1',
    name: 'Tag 1',
    colourHex: '#FF0000',
    description: 'This is a tag',
  },
  {
    ID: '2',
    merchantID: '1',
    name: 'Another tag',
    colourHex: '#00FF00',
    description: 'This is another tag',
  },
  {
    ID: '3',
    merchantID: '1',
    name: 'Third tag',
    colourHex: '#0000FF',
    description: 'This is a third tag',
  },
];

export default {
  title: 'UI/Payment Request Table',
  component: PaymentRequestTable,
  argTypes: {
    paymentRequests: {
      control: {
        type: 'object',
      },
    },
    pageSize: {
      control: {
        type: 'number',
      },
    },
    totalRecords: {
      control: {
        type: 'number',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isEmpty: {
      control: {
        type: 'boolean',
      },
    },
    onPaymentRequestClicked: {
      action: 'Payment Request Clicked',
    },
    onPageChanged: {
      action: 'Page Changed',
    },
    onCreatePaymentRequest: {
      action: 'Create Payment Request Clicked',
    },
  },
} as Meta<typeof PaymentRequestTable>;

const Template: StoryFn<typeof PaymentRequestTable> = (args) => <PaymentRequestTable {...args} />;

const paymentRequests: LocalPaymentRequest[] = [
  {
    id: '1',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 1))),
    contact: {
      name: 'Lukas Müller',
      email: 'lukas.mueller@email.de',
    },
    amount: 900,
    currency: Currency.EUR,
    tags: [
      {
        ID: '1',
        description: 'Logo Design',
        colourHex: '#FF0000',
        name: 'Logo Design',
        merchantID: '1',
      },
      {
        ID: '2',
        description: 'Web Design',
        colourHex: '#00FF00',
        name: 'Web Design',
        merchantID: '1',
      },
    ],
  },
  {
    id: '2',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 3))),
    contact: {
      name: 'Miguel García',
      email: 'miguel.garcia@email.es',
    },
    amount: 1800,
    currency: Currency.EUR,
    tags: [
      {
        ID: '3',
        description: 'App Development',
        colourHex: '#0000FF',
        name: 'App Development',
        merchantID: '1',
      },
      {
        ID: '4',
        description: 'UI Design',
        colourHex: '#FF00FF',
        name: 'UI Design',
        merchantID: '1',
      },
      {
        ID: '5',
        description: 'EU Client',
        colourHex: '#FFFF00',
        name: 'EU Client',
        merchantID: '1',
      },
    ],
  },
  {
    id: '3',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    contact: {
      name: 'Lucas Jones',
      email: 'lucas.jones@email.co.uk',
    },
    amount: 2700,
    currency: Currency.GBP,
    tags: [
      { ID: '6', description: 'ecommerce', colourHex: '#FF0000', name: 'ecommerce', merchantID: '1' },
      { ID: '7', description: 'web-development', colourHex: '#00FF00', name: 'web-development', merchantID: '1' },
      { ID: '8', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
  },
  {
    id: '4',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    contact: {
      name: 'Sophie Smith',
      email: 'sophie.smith@email.co.uk',
    },
    amount: 2500,
    currency: Currency.GBP,
    tags: [
      { ID: '9', description: 'web-design', colourHex: '#FF0000', name: 'web-design', merchantID: '1' },
      { ID: '10', description: 'branding', colourHex: '#00FF00', name: 'branding', merchantID: '1' },
      { ID: '11', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
  },
  {
    id: '5',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    contact: {
      name: 'Oliver Johnson',
      email: 'oliver.johnson@email.co.uk',
    },
    amount: 3000,
    currency: Currency.GBP,
    tags: [
      { ID: '7', description: 'web-development', colourHex: '#FF0000', name: 'web-development', merchantID: '1' },
      { ID: '6', description: 'ecommerce', colourHex: '#00FF00', name: 'ecommerce', merchantID: '1' },
      { ID: '11', description: 'London-client', colourHex: '#0000FF', name: 'London-client', merchantID: '1' },
    ],
  },
  {
    id: '6',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 11)),
    contact: {
      name: 'Ava Wilson',
      email: 'ava.wilson@email.co.uk',
    },
    amount: 1500,
    currency: Currency.GBP,
    tags: [
      { ID: '7', description: 'web-development', colourHex: '#FF0000', name: 'web-development', merchantID: '1' },
      { ID: '6', description: 'ecommerce', colourHex: '#00FF00', name: 'ecommerce', merchantID: '1' },
    ],
  },
  {
    id: '7',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
    contact: {
      name: 'Emily Brown',
      email: 'emily.brown@email.co.uk',
    },
    amount: 1200,
    currency: Currency.GBP,
    tags: [
      { ID: '12', name: 'SEO', merchantID: '1', colourHex: '#000000', description: 'Search Engine Optimization' },
      { ID: '13', name: 'content-creation', merchantID: '1', colourHex: '#000000', description: 'Content Creation' },
      { ID: '14', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
  },
  {
    id: '8',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    contact: {
      name: 'Giuseppe Bianchi',
      email: 'giuseppe.bianchi@email.it',
    },
    amount: 2300,
    currency: Currency.EUR,
    tags: [
      { ID: '15', name: 'web-design', merchantID: '1', colourHex: '#000000', description: 'Web Design' },
      { ID: '16', name: 'responsive-design', merchantID: '1', colourHex: '#000000', description: 'Responsive Design' },
      { ID: '17', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
  },
  {
    id: '9',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
    contact: {
      name: 'François Dubois',
      email: 'francois.dubois@email.fr',
    },
    amount: 1000,
    currency: Currency.EUR,
    tags: [
      { ID: '18', name: 'logo-design', merchantID: '1', colourHex: '#000000', description: 'Logo Design' },
      { ID: '19', name: 'branding', merchantID: '1', colourHex: '#000000', description: 'Branding' },
      { ID: '20', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
  },
  {
    id: '10',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 22)),
    contact: {
      name: 'Isabella Lewis',
      email: 'isabella.lewis@email.co.uk',
    },
    amount: 3500,
    currency: Currency.GBP,
    tags: [
      { ID: '21', name: 'UX-design', merchantID: '1', colourHex: '#000000', description: 'UX Design' },
      { ID: '22', name: 'app-development', merchantID: '1', colourHex: '#000000', description: 'App Development' },
      { ID: '23', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
  },
  {
    id: '11',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    contact: {
      name: 'Lily Taylor',
      email: 'lily.taylor@email.co.uk',
    },
    amount: 4200,
    currency: Currency.GBP,
    tags: [
      { ID: '24', name: 'web-design', merchantID: '1', colourHex: '#000000', description: 'Web Design' },
      { ID: '25', name: 'branding', merchantID: '1', colourHex: '#000000', description: 'Branding' },
      { ID: '26', name: 'London-client', merchantID: '1', colourHex: '#000000', description: 'London Client' },
    ],
  },
  {
    id: '12',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    contact: {
      name: 'Maria Silva',
      email: 'maria.silva@email.pt',
    },
    amount: 2200,
    currency: Currency.EUR,
    tags: [
      { ID: '27', name: 'UI-design', merchantID: '1', colourHex: '#000000', description: 'UI Design' },
      { ID: '28', name: 'app-development', merchantID: '1', colourHex: '#000000', description: 'App Development' },
      { ID: '29', name: 'EU-client', merchantID: '1', colourHex: '#000000', description: 'EU Client' },
    ],
  },
];

export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequests: paymentRequests,
  pageSize: 5,
  totalRecords: 12,
};

export const Loading = Template.bind({});
Loading.args = {
  paymentRequests: [],
  pageSize: 5,
  totalRecords: 12,
  isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  paymentRequests: [],
  pageSize: 5,
  totalRecords: 12,
};

export const InitialState = Template.bind({});
InitialState.args = {
  paymentRequests: [],
  pageSize: 5,
  totalRecords: 0,
  isEmpty: true,
};
