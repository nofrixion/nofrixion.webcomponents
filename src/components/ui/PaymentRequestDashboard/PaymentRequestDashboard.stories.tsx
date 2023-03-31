import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { PaymentRequestStatus } from '../../../api/types/Enums';
import PaymentRequestDashboard from './PaymentRequestDashboard';
import { apiUrls } from '../../../utils/constants';

export default {
  title: 'UI/PaymentRequestDashboard',
  component: PaymentRequestDashboard,
  argTypes: {
    totalRecords: { control: 'number' },
  },
} as ComponentMeta<typeof PaymentRequestDashboard>;

const Template: ComponentStory<typeof PaymentRequestDashboard> = (args) => <PaymentRequestDashboard {...args} />;

export const Showcase = Template.bind({});

Showcase.args = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiN2ZlYmE3MWEtNzM0OS00YTgyLThjOTctODRkZmFkNDRiMTdiIn0.j91GfvpEQeKk2v4XdKH6cDbWz-6rBFomYRdulnti_94',
  apiUrl: apiUrls.dev,
};
