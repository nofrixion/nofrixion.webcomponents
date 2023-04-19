import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Checkbox from './Checkbox';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState<boolean>(false);

  const onChangeChecked = (value: boolean) => {
    setChecked(value);
  };
  return (
    <>
      <Checkbox {...args} value={checked} onChange={onChangeChecked} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Define a priority bank',
  infoText:
    'Select a priority bank to set it as the default payment option for users. This streamlines the payment process by displaying the preferred bank first.',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
};
