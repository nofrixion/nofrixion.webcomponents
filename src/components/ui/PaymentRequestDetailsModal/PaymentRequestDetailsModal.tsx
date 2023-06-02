import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest;
  merchantTags: LocalTag[];
  hostedPaymentLink: string;
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
  hostedPaymentLink,
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
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-[15%]" />
        </Transition.Child>
        <div className="fixed inset-y-0 right-0">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel>
              <div className="bg-white max-h-screen overflow-auto w-[37.5rem]">
                <div className="max-h-[63.5rem] h-screen ">
                  <div className="h-fit">
                    <PaymentRequestDetails
                      paymentRequest={paymentRequest}
                      merchantTags={merchantTags}
                      hostedPaymentLink={hostedPaymentLink}
                      onRefundClick={onRefundClick}
                      onTagAdded={onTagAdded}
                      onTagDeleted={onTagDeleted}
                      onTagCreated={onTagCreated}
                    ></PaymentRequestDetails>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentRequestDetailsModal;
