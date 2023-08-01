import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails';
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import CaptureModal from '../CaptureModal/CaptureModal';
import { Currency } from '@nofrixion/moneymoov';
import { Sheet, SheetContent } from '@/components/ui/atoms';
import CardRefundModal from '../CardRefundModal/CardRefundModal';
import { IsPartialCardRefundPossible, getMaxRefundableAmount } from '../../../utils/paymentAttemptsHelper';

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

  const [selectedTransactionForRefund, setSelectedTransactionForRefund] = React.useState<LocalPaymentAttempt>();
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
      await onRefund(selectedTransactionForRefund.attemptKey, parsedAmount);
      onRefundDismiss();
    }
  };

  const onRefundDismiss = () => {
    setSelectedTransactionForRefund(undefined);
    setAmountToRefund(undefined);
  };

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss();
    }
  };

  const handleOnCaptureFormOpenChange = (open: boolean) => {
    if (!open) {
      onCaptureDismiss();
    }
  };

  const handleOnRefundFormOpenChange = (open: boolean) => {
    if (!open) {
      onRefundDismiss();
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
                  onRefund={onRefundClick}
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

      <Sheet open={!!selectedTransaction} onOpenChange={handleOnCaptureFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
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
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedTransactionForRefund} onOpenChange={handleOnRefundFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
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
                IsPartialRefundPossible={IsPartialCardRefundPossible(selectedTransactionForRefund)}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PaymentRequestDetailsModal;
