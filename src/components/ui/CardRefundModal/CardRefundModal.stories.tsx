import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Currency } from '@nofrixion/moneymoov';
import CardRefundModal, { CardRefundModalProps } from './CardRefundModal';

const meta: Meta<typeof CardRefundModal> = {
  title: 'UI/Card Refund Modal',
  component: CardRefundModal,
  argTypes: {
    onRefund: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
    initialAmount: { control: { type: 'text' } },
    currency: { control: { type: 'select', options: [Currency.EUR, Currency.GBP] } },
    maxRefundableAmount: { control: { type: 'number' } },
    lastFourDigitsOnCard: { control: { type: 'text' } },
    processor: { control: { type: 'select', options: ['VISA', 'MasterCard', 'American Express'] } },
    transactionDate: { control: { type: 'date' } },
    contactName: { control: { type: 'text' } },
  },
};

const Template: StoryFn<CardRefundModalProps> = (args) => {
  return <CardRefundModal {...args} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  initialAmount: '1222.99',
  currency: Currency.EUR,
  onDismiss: action('Dismissed'),
  transactionDate: new Date(),
  maxRefundableAmount: 1222.99,
};

export const GBPInput = Template.bind({});

GBPInput.args = {
  initialAmount: '27.5',
  currency: Currency.GBP,
  onDismiss: action('Dismissed'),
  transactionDate: new Date(),
  maxRefundableAmount: 27.5,
};

export default meta;
