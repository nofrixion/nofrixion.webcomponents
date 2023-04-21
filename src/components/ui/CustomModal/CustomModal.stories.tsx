import { StoryFn, Meta } from '@storybook/react';

import CustomModal from './CustomModal';

export default {
  title: 'UI/Custom Modal',
  component: CustomModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
    onDismiss: {
      action: 'Dismiss',
    },
    onDelete: {
      action: 'Delete selected',
    },
  },
} as Meta<typeof CustomModal>;

const Template: StoryFn<typeof CustomModal> = (args) => <CustomModal {...args}>{args.children}</CustomModal>;

export const Showcase = Template.bind({});
Showcase.args = {
  title: 'I am a modal',
  open: true,
  enableUseAsDefault: true,
  children: <div>I am the content of the modal</div>,
};
