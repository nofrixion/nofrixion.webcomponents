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
  },
};

const Template: StoryFn<CaptureModalProps> = (args) => {
  return <CaptureModal {...args} />;
};

export const Showcase = Template.bind({});

Showcase.args = {
  initialAmount: '1222.99',
  currency: Currency.EUR,
  onCapture: action('Captured'),
  onDismiss: action('Dismissed'),
};

export const GBPInput = Template.bind({});

GBPInput.args = {
  initialAmount: '27.5',
  currency: Currency.GBP,
  onCapture: action('Captured'),
  onDismiss: action('Dismissed'),
};

export default meta;
