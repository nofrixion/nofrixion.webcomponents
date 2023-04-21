import { StoryFn, Meta } from '@storybook/react';

import AvailableMethodsModal from './AvailableMethodsModal';

export default {
  title: 'UI/Available Methods Modal',
  component: AvailableMethodsModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
  },
} as Meta<typeof AvailableMethodsModal>;

const Template: StoryFn<typeof AvailableMethodsModal> = (args) => <AvailableMethodsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
};
