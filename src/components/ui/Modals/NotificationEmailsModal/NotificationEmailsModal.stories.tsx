import { StoryFn, Meta } from '@storybook/react';

import NotificationEmailsModal from './NotificationEmailsModal';

export default {
  title: 'UI/Notification emails Modal',
  component: NotificationEmailsModal,
  argTypes: {
    onApply: {
      action: 'Apply',
    },
  },
} as Meta<typeof NotificationEmailsModal>;

const Template: StoryFn<typeof NotificationEmailsModal> = (args) => <NotificationEmailsModal {...args} />;

export const Showcase = Template.bind({});
Showcase.args = {
  open: true,
};
