import { LocalPaymentMethodTypes, SubTransactionType } from '../types/LocalEnums';
import { LocalPaymentAttempt, SubTransaction } from '../types/LocalTypes';

/**
 * Calculates the total amount paid in a payment request. It is the sum of amount received minus amount refunded.
 * @param paymentAttempts
 * @returns The total amount paid in a payment request.
 */
export const getTotalAmountPaid = (paymentAttempts: LocalPaymentAttempt[]): number => {
  return paymentAttempts.reduce((acc, curr) => acc + getAmountPaid(curr), 0);
};

/**
 * Calculates the maximum amount that can be refunded in a payment request. It is the sum of amount received minus amount captured.
 * @param paymentAttempts
 * @returns The maximum amount that can be refunded in a payment request.
 */
export const getMaxRefundableAmount = (paymentAttempt: LocalPaymentAttempt): number => {
  return getAmountPaid(paymentAttempt);
};

export const getMaxCapturableAmount = (paymentAttempt: LocalPaymentAttempt): number => {
  return getAmountPaid(paymentAttempt) - getAmountCaptured(paymentAttempt);
};

export const hasRefundOrCaptureAttempts = (paymentAttempt: LocalPaymentAttempt): boolean => {
  return paymentAttempt.captureAttempts.length > 0 || paymentAttempt.refundAttempts.length > 0;
};

/**
 * Checks if a payment attempt is refundable. A payment attempt is refundable if the amount paid is greater than the amount refunded.
 * @param paymentAttempt
 * @returns True if the payment attempt is refundable, false otherwise.
 */
export const isRefundable = (paymentAttempt: LocalPaymentAttempt): boolean => {
  return getMaxRefundableAmount(paymentAttempt) > 0;
};

/**
 * Checks if a payment attempt is captureable. A payment attempt is captureable if the payment method is card and the amount paid is greater than the amount captured.
 * @param paymentAttempt
 * @returns True if the payment attempt is captureable, false otherwise.
 */
export const isCaptureable = (paymentAttempt: LocalPaymentAttempt): boolean => {
  if (paymentAttempt.paymentMethod !== LocalPaymentMethodTypes.Card) {
    return false;
  }
  return getAmountPaid(paymentAttempt) > getAmountCaptured(paymentAttempt);
};

/**
 * Gets the subtransactions of a payment attempt. A subtransaction is a capture or refund attempt. The subtransactions are sorted by date in descending order.
 * @param paymentAttempt
 * @returns The subtransactions of a payment attempt.
 */
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

/**
 * Checks if a payment attempt is partially refundable. A payment attempt is partially refundable
 * if the payment request is authorise only and the no captures have been made.In this case the card
 * is voided which does not allow partial voids.
 * @param paymentAttempt
 * @returns True if the payment attempt is partially refundable, false otherwise.
 */
export const isPartialCardRefundPossible = (paymentAttempt: LocalPaymentAttempt | undefined): boolean => {
  if (paymentAttempt === undefined) {
    return false;
  } else {
    return (
      paymentAttempt.paymentMethod === LocalPaymentMethodTypes.Card &&
      paymentAttempt.cardAuthorisedAmount != null &&
      paymentAttempt.cardAuthorisedAmount > 0 &&
      getAmountCaptured(paymentAttempt) > 0
    );
  }
};

export const getAmountPaid = (paymentAttempt: LocalPaymentAttempt): number => {
  return getAmountReceived(paymentAttempt) - getAmountRefunded(paymentAttempt);
};

export const getAmountReceived = (paymentAttempt: LocalPaymentAttempt): number => {
  switch (paymentAttempt.paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return paymentAttempt.cardAuthorisedAmount && paymentAttempt.cardAuthorisedAmount > 0 // This is just so prod doesn't break. Need to remove this logic and use only cardAuthorisedAmount after API prod deployment.
        ? paymentAttempt.cardAuthorisedAmount
        : paymentAttempt.authorisedAmount;
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
