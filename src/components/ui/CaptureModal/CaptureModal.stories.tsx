import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CaptureModal, { CaptureModalProps } from './CaptureModal';
import { action } from '@storybook/addon-actions';
import { Currency } from '@nofrixion/moneymoov';

const meta: Meta<typeof CaptureModal> = {
  title: 'UI/Capture Modal',
  component: CaptureModal,
  argTypes: {
    onCapture: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
    initialAmount: { control: { type: 'text' } },
    currency: { control: { type: 'select', options: [Currency.EUR, Currency.GBP] } },
    maxCapturableAmount: { control: { type: 'number' } },
    lastFourDigitsOnCard: { control: { type: 'text' } },
    processor: { control: { type: 'select', options: ['VISA', 'MasterCard', 'American Express'] } },
    transactionDate: { control: { type: 'date' } },
    contactName: { control: { type: 'text' } },
  },
};

const Template: StoryFn<CaptureModalProps> = (args) => {
  return <CaptureModal {...args} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  initialAmount: '1222.99',
  currency: Currency.EUR,
  onDismiss: action('Dismissed'),
  transactionDate: new Date(),
  maxCapturableAmount: 1222.99,
};

export const GBPInput = Template.bind({});

GBPInput.args = {
  initialAmount: '27.5',
  currency: Currency.GBP,
  onDismiss: action('Dismissed'),
  transactionDate: new Date(),
  maxCapturableAmount: 27.5,
};

export default meta;
