import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Checkbox from '../Checkbox/Checkbox';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest;
  merchantTags: LocalTag[];
  onRefundClick: (paymentAttemptID: string) => void;
  onTagAdded: (tag: LocalTag) => void;
  onTagDeleted: (id: string) => void;
  onTagCreated: (tag: LocalTag) => void;
  open: boolean;
  onDismiss: () => void;
}

const PaymentRequestDetailsModal = ({
  paymentRequest,
  merchantTags,
  onRefundClick,
  onTagAdded,
  onTagDeleted,
  onTagCreated,
  open,
  onDismiss,
}: PaymentRequestDetailsModalProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onDismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-5" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel>
              <div className="w-[37.5rem] h-[63.438rem] overflow-auto float-right bg-white">
                <PaymentRequestDetails
                  paymentRequest={paymentRequest}
                  merchantTags={merchantTags}
                  onRefundClick={onRefundClick}
                  onTagAdded={onTagAdded}
                  onTagDeleted={onTagDeleted}
                  onTagCreated={onTagCreated}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentRequestDetailsModal;
