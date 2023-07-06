import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PaymentRequestTable from './PaymentRequestTable';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { Currency } from '@nofrixion/moneymoov';
import mockedData from '../../../utils/mockedData';

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

const paymentRequests: LocalPaymentRequest[] = mockedData.fewPaymentRequests;

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
