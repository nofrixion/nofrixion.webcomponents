export enum LocalPaymentMethodTypes {
  None = 'None',
  Card = 'card',
  Pisp = 'pisp',
  ApplePay = 'applepay',
  GooglePay = 'googlepay',
  Lightning = 'lightning',
}

export enum LocalAddressType {
  Unknown = 'Unknown',
  Shipping = 'Shipping',
  Billing = 'Billing',
}

export enum LocalWallets {
  ApplePay = 'Apple Pay',
  GooglePay = 'Google Pay',
}

export enum LocalPartialPaymentMethods {
  None = 'None',
  Partial = 'Partial',
}

export enum LocalCardPaymentResponseStatus {
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  CardAuthorizedSuccess = 'AUTHORIZED',
  PendingAuthentication = 'PENDING_AUTHENTICATION',
  CardCaptureSuccess = 'PENDING',
  CardPaymentSoftDecline = '202',
  CardVoidedSuccess = 'VOIDED',
  CardCheckoutCaptured = 'CAPTURED',
  CardCheckoutAuthorized = 'Authorized',
  CardCheckoutVerified = 'CardVerified',
}

export enum SubTransactionType {
  Refund = 'Refund',
  Capture = 'Capture',
}
