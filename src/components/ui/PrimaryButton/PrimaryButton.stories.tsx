import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PrimaryButton from './PrimaryButton';

export default {
  title: 'UI/PrimaryButton',
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
};

export const CreatePaymentRequest = Template.bind({});
CreatePaymentRequest.args = {
  label: 'Create payment request',
};

export const DoSomethingElse = Template.bind({});
DoSomethingElse.args = {
  label: 'Do something else',
};
