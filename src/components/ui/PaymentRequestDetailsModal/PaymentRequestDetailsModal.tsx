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
        <div className="fixed inset-0 lg:inset-y-0 lg:right-0 lg:left-auto">
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
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <button type="button" className="opacity-0 pointer-events-none focus:outline-none" onClick={onDismiss}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Review PR */}
              <div className="block lg:hidden absolute bottom-0 w-full px-6 mx-auto pb-4 z-20">
                <button
                  key="review-pr"
                  type="button"
                  className="w-full h-12 px-16 whitespace-nowrap flex justify-center items-center rounded-full py-3 text-sm cursor-pointer bg-[#DEE5ED] transition hover:bg-[#BDCCDB]"
                  onClick={onDismiss}
                >
                  <svg width="16" height="16" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Close Button">
                      <path
                        id="Vector 11"
                        d="M22 21L12 11L22 1"
                        stroke="#454D54"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        id="Vector 15"
                        d="M2 0.999999L12 11L2 21"
                        stroke="#454D54"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                  <span className="ml-2">Close</span>
                </button>
              </div>

              <div className="bg-white max-h-screen overflow-auto lg:w-[37.5rem]">
                <div className="max-h-full h-screen">
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
