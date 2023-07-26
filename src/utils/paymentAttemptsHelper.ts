import { LocalPaymentMethodTypes, SubTransactionType } from '../types/LocalEnums';
import { LocalPaymentAttempt, SubTransaction } from '../types/LocalTypes';

export const getAmountPaid = (paymentAttempt: LocalPaymentAttempt): number => {
  switch (paymentAttempt.paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return paymentAttempt.cardAuthorisedAmount;
    case LocalPaymentMethodTypes.Pisp:
      return paymentAttempt.settledAmount;
    default:
      return 0;
  }
};

export const getAmountRefunded = (paymentAttempt: LocalPaymentAttempt): number => {
  return paymentAttempt.refundAttempts.reduce((acc, curr) => acc + curr.refundSettledAmount, 0);
};

export const getAmountCaptured = (paymentAttempt: LocalPaymentAttempt): number => {
  return paymentAttempt.captureAttempts.reduce((acc, curr) => acc + curr.capturedAmount, 0);
};

export const getAmountPaidLessRefunded = (paymentAttempt: LocalPaymentAttempt): number => {
  return getAmountPaid(paymentAttempt) - getAmountRefunded(paymentAttempt);
};

export const getMaxRefundableAmount = (paymentAttempt: LocalPaymentAttempt): number => {
  return getAmountPaidLessRefunded(paymentAttempt);
};

export const hasRefundOrCaptureAttempts = (paymentAttempt: LocalPaymentAttempt): boolean => {
  return paymentAttempt.captureAttempts.length > 0 || paymentAttempt.refundAttempts.length > 0;
};

export const isRefundable = (paymentAttempt: LocalPaymentAttempt): boolean => {
  return getMaxRefundableAmount(paymentAttempt) > 0;
};

export const isCaptureable = (paymentAttempt: LocalPaymentAttempt): boolean => {
  if (paymentAttempt.paymentMethod !== LocalPaymentMethodTypes.Card) {
    return false;
  }
  return getAmountPaidLessRefunded(paymentAttempt) > getAmountCaptured(paymentAttempt);
};

export const getSubTransactions = (paymentAttempt: LocalPaymentAttempt): SubTransaction[] => {
  const subtransactions: SubTransaction[] = [
    ...paymentAttempt.captureAttempts.map(({ capturedAt, capturedAmount }) => ({
      occurredAt: capturedAt,
      amount: capturedAmount,
      currency: paymentAttempt.currency,
      type: SubTransactionType.Capture,
    })),
    ...paymentAttempt.refundAttempts.map(({ refundSettledAt, refundSettledAmount }) => ({
      occurredAt: refundSettledAt,
      amount: refundSettledAmount,
      currency: paymentAttempt.currency,
      type: SubTransactionType.Refund,
    })),
  ];

  return subtransactions.sort((a, b) => {
    return new Date(b.occurredAt ?? 0).getTime() - new Date(a.occurredAt ?? 0).getTime();
  });
};
