import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import CaptureModal from '../CaptureModal/CaptureModal';
import { Currency } from '@nofrixion/moneymoov';

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest;
  merchantTags: LocalTag[];
  hostedPaymentLink: string;
  onRefund: (paymentAttemptID: string) => void;
  onCapture: (authorizationID: string, amount: number) => Promise<void>;
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
  onRefund,
  onCapture,
  onTagAdded,
  onTagDeleted,
  onTagCreated,
  open,
  onDismiss,
}: PaymentRequestDetailsModalProps) => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<LocalPaymentAttempt | undefined>();
  const [amountToCapture, setAmountToCapture] = React.useState<string | undefined>(
    ((selectedTransaction?.amount ?? 0) - (selectedTransaction?.capturedAmount ?? 0)).toString(),
  );

  const onTransactionSelectForCapture = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransaction(paymentAttempt);
    setAmountToCapture((paymentAttempt.amount - paymentAttempt.capturedAmount).toString());
  };

  const onCaptureClick = async () => {
    if (selectedTransaction) {
      let parsedAmount = Number(amountToCapture);
      parsedAmount = (parsedAmount ?? 0) >= selectedTransaction.amount ? 0 : parsedAmount!;
      await onCapture(selectedTransaction.attemptKey, parsedAmount);
      onCaptureDismiss();
    }
  };

  const onCaptureDismiss = () => {
    setSelectedTransaction(undefined);
    setAmountToCapture(undefined);
  };

  return (
    <>
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
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    className="opacity-0 pointer-events-none focus:outline-none"
                    onClick={onDismiss}
                  >
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

                <div className="bg-white max-h-screen overflow-auto w-[37.5rem]">
                  <div className="max-h-full h-screen ">
                    <div className="h-fit">
                      <PaymentRequestDetails
                        paymentRequest={paymentRequest}
                        merchantTags={merchantTags}
                        hostedPaymentLink={hostedPaymentLink}
                        onRefund={onRefund}
                        onCapture={onTransactionSelectForCapture}
                        onTagAdded={onTagAdded}
                        onTagDeleted={onTagDeleted}
                        onTagCreated={onTagCreated}
                      ></PaymentRequestDetails>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>

            <Transition appear show={!!selectedTransaction} as={Fragment}>
              <Dialog as="div" onClose={onCaptureDismiss}>
                <div className="fixed inset-y-0 right-0">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform transition ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel>
                      <CaptureModal
                        onCapture={onCaptureClick}
                        onDismiss={onCaptureDismiss}
                        initialAmount={amountToCapture ?? '0'}
                        currency={selectedTransaction?.currency ?? Currency.EUR}
                        setAmountToCapture={setAmountToCapture}
                        transactionDate={selectedTransaction?.occurredAt ?? new Date()}
                        totalTransactionAmount={selectedTransaction?.amount ?? 0}
                        contactName={paymentRequest.contact.name}
                        lastFourDigitsOnCard={selectedTransaction?.last4DigitsOfCardNumber}
                        processor={selectedTransaction?.processor}
                      />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentRequestDetailsModal;
