import { StoryFn, Meta } from '@storybook/react';
import PaymentRequestDetailsModal from './PaymentRequestDetailsModal';
import mockedData from '../../../utils/mockedData';
import { useState } from 'react';

export default {
  title: 'UI/PaymentRequestDetailsModal',
  component: PaymentRequestDetailsModal,
  argTypes: {
    onDismiss: {
      action: 'Dismiss',
    },
    onRefundClick: { action: 'refund clicked' },
    onTagAdded: { action: 'tag added' },
    onTagCreated: { action: 'tag created' },
    onTagDeleted: { action: 'tag deleted' },
  },
} as Meta<typeof PaymentRequestDetailsModal>;

const Template: StoryFn<typeof PaymentRequestDetailsModal> = (args) => {
  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          I am a payment request row. Click me.
        </button>
      </div>
      <PaymentRequestDetailsModal {...args} open={isOpen} onDismiss={onClose}></PaymentRequestDetailsModal>
    </>
  );
};

export const Showcase = Template.bind({});
Showcase.args = {
  open: false,
  paymentRequest: mockedData.paymentRequest.regular,
  merchantTags: mockedData.merchantTags,
};
