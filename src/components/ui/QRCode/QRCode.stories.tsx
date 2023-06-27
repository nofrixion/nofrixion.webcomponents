import { StoryFn, Meta } from '@storybook/react';

import QRCode from './QRCode';

export default {
  title: 'UI/QRCode',
  component: QRCode,
} as Meta<typeof QRCode>;

const Template: StoryFn<typeof QRCode> = (args) => {
  return (
    <>
      <QRCode {...args} />
    </>
  );
};

export const Showcase = Template.bind({});
Showcase.args = {
  url: 'https://api-dev.nofrixion.com/nextgen/pay/c4db21c3-17a4-4e3a-8b19-87b4e9c07766',
};
