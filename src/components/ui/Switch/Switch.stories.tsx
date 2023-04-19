import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../assets/icons/card-icon.svg';
import ApplePayIcon from '../../../assets/icons/apple-icon.svg';
import BitcoinIcon from '../../../assets/icons/bitcoin-icon.svg';

import Switch from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const onChangeEnabled = (checked: boolean) => {
    setEnabled(checked);
  };
  return <Switch {...args} value={enabled} onChange={onChangeEnabled} />;
};

export const BankTransfer = Template.bind({});
BankTransfer.args = {
  label: 'Bank transfer',
  icon: BankIcon,
};

export const Cards = Template.bind({});
Cards.args = {
  label: 'Credit and debit card',
  icon: CardIcon,
};

export const ApplePay = Template.bind({});
ApplePay.args = {
  label: 'Apple Pay',
  icon: ApplePayIcon,
};

export const BitcoinLightning = Template.bind({});
BitcoinLightning.args = {
  label: 'Bitcoin Lightning',
  icon: BitcoinIcon,
};
