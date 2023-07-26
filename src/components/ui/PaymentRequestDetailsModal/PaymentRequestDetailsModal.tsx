import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import CaptureModal from '../CaptureModal/CaptureModal';
import { Currency } from '@nofrixion/moneymoov';
import CardRefundModal from '../CardRefundModal/CardRefundModal';
import { getMaxRefundableAmount } from '../../../utils/paymentAttemptsHelper';

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest;
  merchantTags: LocalTag[];
  hostedPaymentLink: string;
  onRefund: (authorizationID: string, amount: number) => Promise<void>;
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
    ((selectedTransaction?.amount ?? 0) - (selectedTransaction?.settledAmount ?? 0)).toString(),
  );
  const maxCapturableAmount = (selectedTransaction?.amount ?? 0) - (selectedTransaction?.settledAmount ?? 0);

  const onTransactionSelectForCapture = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransaction(paymentAttempt);
    setAmountToCapture((paymentAttempt.amount - paymentAttempt.settledAmount).toString());
  };

  const onCaptureClick = async () => {
    if (selectedTransaction) {
      let parsedAmount = Number(amountToCapture);
      let remainingAmount = selectedTransaction.amount - (selectedTransaction.settledAmount ?? 0);
      parsedAmount = (parsedAmount ?? 0) > remainingAmount ? remainingAmount : parsedAmount!;
      await onCapture(selectedTransaction.attemptKey, parsedAmount);
      onCaptureDismiss();
    }
  };

  const onCaptureDismiss = () => {
    setSelectedTransaction(undefined);
    setAmountToCapture(undefined);
  };

  const [selectedTransactionForRefund, setSelectedTransactionForRefund] = React.useState<
    LocalPaymentAttempt | undefined
  >();
  const [maxRefundableAmount, setMaxRefundableAmount] = React.useState<number>(0);

  useEffect(() => {
    if (!selectedTransactionForRefund) return;

    const maxRefundableAmount = getMaxRefundableAmount(selectedTransactionForRefund);
    setMaxRefundableAmount(maxRefundableAmount);
    setAmountToRefund(maxRefundableAmount.toString());
  }, [selectedTransactionForRefund]);

  const [amountToRefund, setAmountToRefund] = React.useState<string | undefined>();

  // This method is called when the user clicks on the refund button
  const onRefundClick = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransactionForRefund(paymentAttempt);
  };

  // This method is called when the user confirms the refund
  const onRefundConfirm = async () => {
    if (selectedTransactionForRefund) {
      let parsedAmount = Number(amountToRefund);
      parsedAmount = (parsedAmount ?? 0) > maxRefundableAmount ? maxRefundableAmount : parsedAmount!;
      console.log('Refunding', parsedAmount);
      await onRefund(selectedTransactionForRefund.attemptKey, parsedAmount);
      onRefundDismiss();
    }
  };

  const onRefundDismiss = () => {
    setSelectedTransactionForRefund(undefined);
    setAmountToRefund(undefined);
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
          <div className="z-50 fixed inset-0 lg:inset-y-0 lg:right-0 lg:left-auto">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-y-full lg:translate-x-full lg:translate-y-0"
              enterTo="translate-y-0 lg:translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-y-0 lg:translate-x-0"
              leaveTo="translate-y-full lg:translate-x-full lg:translate-y-0"
            >
              {/*
                h-full fixes issue on mobile where transform class generates
                 difficulties to consider the browser Address Bar
              */}
              <Dialog.Panel className="h-full">
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

                {/* Close button */}
                <div className="lg:hidden fixed bottom-0 w-full px-6 mx-auto py-4 z-20 bg-gradient-to-b from-transparent via-mainGrey via-30% to-mainGrey">
                  <button
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector 15"
                          d="M2 0.999999L12 11L2 21"
                          stroke="#454D54"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span className="ml-2">Close</span>
                  </button>
                </div>

                <div className="bg-white max-h-screen overflow-auto lg:w-[37.5rem]">
                  <div className="max-h-full h-screen">
                    <div className="h-fit pb-16 lg:pb-0">
                      <PaymentRequestDetails
                        paymentRequest={paymentRequest}
                        merchantTags={merchantTags}
                        hostedPaymentLink={hostedPaymentLink}
                        onRefund={onRefundClick}
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
                <div className="fixed inset-0 lg:inset-y-0 lg:right-0 lg:left-auto">
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
                        maxCapturableAmount={maxCapturableAmount}
                        currency={selectedTransaction?.currency ?? Currency.EUR}
                        setAmountToCapture={setAmountToCapture}
                        transactionDate={selectedTransaction?.occurredAt ?? new Date()}
                        contactName={paymentRequest.contact.name}
                        lastFourDigitsOnCard={selectedTransaction?.last4DigitsOfCardNumber}
                        processor={selectedTransaction?.processor}
                      />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>

            <Transition appear show={!!selectedTransactionForRefund} as={Fragment}>
              <Dialog as="div" onClose={onRefundDismiss}>
                <div className="fixed inset-0 lg:inset-y-0 lg:right-0 lg:left-auto">
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
                      <CardRefundModal
                        onRefund={onRefundConfirm}
                        onDismiss={onRefundDismiss}
                        initialAmount={amountToRefund ?? '0'}
                        maxRefundableAmount={maxRefundableAmount}
                        currency={selectedTransactionForRefund?.currency ?? Currency.EUR}
                        setAmountToRefund={setAmountToRefund}
                        transactionDate={selectedTransactionForRefund?.occurredAt ?? new Date()}
                        contactName={paymentRequest.contact.name}
                        lastFourDigitsOnCard={selectedTransactionForRefund?.last4DigitsOfCardNumber}
                        processor={selectedTransactionForRefund?.processor}
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
