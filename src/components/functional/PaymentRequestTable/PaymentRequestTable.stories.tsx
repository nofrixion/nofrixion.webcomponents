import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { apiUrls } from '../../../utils/constants';
import PaymentRequestTable from './PaymentRequestTable';

export default {
  title: 'Functional/Payment Request Table',
  component: PaymentRequestTable,
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: {
        type: 'select',
        options: Object.values(apiUrls),
      },
    },
  },
} as ComponentMeta<typeof PaymentRequestTable>;

const Template: ComponentStory<typeof PaymentRequestTable> = (args) => <PaymentRequestTable {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiNTE0MGNjNDQtNGJlMi00NDM2LTg2ZmEtNTAxZTBiZjJiYjczIn0.kw74ZJpia5pTO4KpKqUDprPxIQTzEbCKKngupQ8oDSM',
  apiUrl: apiUrls.local,
};
