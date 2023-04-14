import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PaymentRequestTable from './PaymentRequestTable';

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
    onPaymentRequestClicked: {
      action: 'Payment Request Clicked',
    },
    onPageChanged: {
      action: 'Page Changed',
    },
  },
} as Meta<typeof PaymentRequestTable>;

const Template: StoryFn<typeof PaymentRequestTable> = (args) => <PaymentRequestTable {...args} />;

const paymentRequests = [
  {
    status: 'unpaid',
    createdAt: new Date().setDate(new Date().getDate() - 1),
    contact: {
      name: 'Lukas Müller',
      email: 'lukas.mueller@email.de',
    },
    amount: 900,
    currency: 'EUR',
    tags: [{ name: 'logo-design' }, { name: 'EU-client' }],
  },
  {
    status: 'unpaid',
    createdAt: new Date().setDate(new Date().getDate() - 3),
    contact: {
      name: 'Miguel García',
      email: 'miguel.garcia@email.es',
    },
    amount: 1800,
    currency: 'EUR',
    tags: [{ name: 'app-development' }, { name: 'UI-design' }, { name: 'EU-client' }],
  },
  {
    status: 'unpaid',
    createdAt: new Date().setDate(new Date().getDate() - 5),
    contact: {
      name: 'Lucas Jones',
      email: 'lucas.jones@email.co.uk',
    },
    amount: 2700,
    currency: 'GBP',
    tags: [{ name: 'ecommerce' }, { name: 'web-development' }, { name: 'London-client' }],
  },
  {
    status: 'paid',
    createdAt: new Date().setDate(new Date().getDate() - 7),
    contact: {
      name: 'Sophie Smith',
      email: 'sophie.smith@email.co.uk',
    },
    amount: 2500,
    currency: 'GBP',
    tags: [{ name: 'web-design' }, { name: 'branding' }, { name: 'London-client' }],
  },
  {
    status: 'unpaid',
    createdAt: new Date().setDate(new Date().getDate() - 10),
    contact: {
      name: 'Oliver Johnson',
      email: 'oliver.johnson@email.co.uk',
    },
    amount: 3000,
    currency: 'GBP',
    tags: [{ name: 'web-development' }, { name: 'ecommerce' }, { name: 'London-client' }],
  },
  {
    status: 'partial',
    createdAt: new Date().setDate(new Date().getDate() - 11),
    contact: {
      name: 'Ava Wilson',
      email: 'ava.wilson@email.co.uk',
    },
    amount: 1500,
    currency: 'GBP',
    tags: [{ name: 'content-creation' }, { name: 'SEO' }, { name: 'London-client' }],
  },
  {
    status: 'partial',
    createdAt: new Date().setDate(new Date().getDate() - 14),
    contact: {
      name: 'Emily Brown',
      email: 'emily.brown@email.co.uk',
    },
    amount: 1200,
    currency: 'GBP',
    tags: [{ name: 'SEO' }, { name: 'content-creation' }, { name: 'London-client' }],
  },
  {
    status: 'paid',
    createdAt: new Date().setDate(new Date().getDate() - 15),
    contact: {
      name: 'Giuseppe Bianchi',
      email: 'giuseppe.bianchi@email.it',
    },
    amount: 2300,
    currency: 'EUR',
    tags: [{ name: 'web-design' }, { name: 'responsive-design' }, { name: 'EU-client' }],
  },
  {
    status: 'paid',
    createdAt: new Date().setDate(new Date().getDate() - 20),
    contact: {
      name: 'François Dubois',
      email: 'francois.dubois@email.fr',
    },
    amount: 1000,
    currency: 'EUR',
    tags: [{ name: 'logo-design' }, { name: 'branding' }, { name: 'EU-client' }],
  },
  {
    status: 'paid',
    createdAt: new Date().setDate(new Date().getDate() - 22),
    contact: {
      name: 'Isabella Lewis',
      email: 'isabella.lewis@email.co.uk',
    },
    amount: 3500,
    currency: 'GBP',
    tags: [{ name: 'UX-design' }, { name: 'app-development' }, { name: 'London-client' }],
  },
  {
    status: 'paid',
    createdAt: new Date().setDate(new Date().getDate() - 25),
    contact: {
      name: 'Lily Taylor',
      email: 'lily.taylor@email.co.uk',
    },
    amount: 4200,
    currency: 'GBP',
    tags: [{ name: 'web-design' }, { name: 'branding' }, { name: 'London-client' }],
  },
  {
    status: 'partial',
    createdAt: new Date().setDate(new Date().getDate() - 30),
    contact: {
      name: 'Maria Silva',
      email: 'maria.silva@email.pt',
    },
    amount: 2200,
    currency: 'EUR',
    tags: [{ name: 'UI-design' }, { name: 'app-development' }, { name: 'EU-client' }],
  },
];

export const Showcase = Template.bind({});
Showcase.args = {
  paymentRequests: paymentRequests,
  pageSize: 5,
  totalRecords: 12,
};
