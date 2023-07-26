import { LocalPaymentMethodTypes, SubTransactionType } from '../types/LocalEnums';
import { LocalPaymentAttempt, SubTransaction } from '../types/LocalTypes';

export const getMaxRefundableAmount = (paymentAttempt: LocalPaymentAttempt): number => {
  switch (paymentAttempt.paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return (
        (paymentAttempt.authorizedAmount ?? 0) -
        (paymentAttempt.refundAttempts.reduce((acc, curr) => acc + curr.refundSettledAmount, 0) ?? 0)
      );
    case LocalPaymentMethodTypes.Pisp:
      return (
        (paymentAttempt.settledAmount ?? 0) -
        (paymentAttempt.refundAttempts.reduce((acc, curr) => acc + curr.refundSettledAmount, 0) ?? 0)
      );
    default:
      return 0;
  }
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
  return (
    paymentAttempt.authorizedAmount -
      paymentAttempt.refundAttempts.reduce((acc, curr) => acc + curr.refundSettledAmount, 0) >
    paymentAttempt.settledAmount
  );
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
