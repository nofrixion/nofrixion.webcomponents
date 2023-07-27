import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import CaptureModal from '../CaptureModal/CaptureModal';
import { Currency } from '@nofrixion/moneymoov';
import { Sheet, SheetContent } from '@/components/ui/atoms';

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
  const maxCapturableAmount = (selectedTransaction?.amount ?? 0) - (selectedTransaction?.capturedAmount ?? 0);

  const onTransactionSelectForCapture = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransaction(paymentAttempt);
    setAmountToCapture((paymentAttempt.amount - paymentAttempt.capturedAmount).toString());
  };

  const onCaptureClick = async () => {
    if (selectedTransaction) {
      let parsedAmount = Number(amountToCapture);
      let remainingAmount = selectedTransaction.amount - (selectedTransaction.capturedAmount ?? 0);
      parsedAmount = (parsedAmount ?? 0) > remainingAmount ? remainingAmount : parsedAmount!;
      await onCapture(selectedTransaction.attemptKey, parsedAmount);
      onCaptureDismiss();
    }
  };

  const onCaptureDismiss = () => {
    setSelectedTransaction(undefined);
    setAmountToCapture(undefined);
  };

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss();
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOnOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
              <div className="h-fit pb-16 lg:pb-0">
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
        </SheetContent>
      </Sheet>

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
    </>
  );
};

export default PaymentRequestDetailsModal;
