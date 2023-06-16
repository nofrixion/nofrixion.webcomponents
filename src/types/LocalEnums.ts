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

export enum LocalPaymentRequestEventType {
  unknown = 'unknown',
  card_payer_authentication_setup = 'card_payer_authentication_setup',
  card_authorization = 'card_authorization',
  card_sale = 'card_sale',
  card_capture = 'card_capture',
  card_void = 'card_void',
  pisp_initiate = 'pisp_initiate',
  pisp_callback = 'pisp_callback',
  lightning_invoice_created = 'lightning_invoice_created',
  lightning_invoice_paid = 'lightning_invoice_paid',
  card_payer_authentication_failure = 'card_payer_authentication_failure',
  pisp_webhook = 'pisp_webhook',
  pisp_settle = 'pisp_settle',
}

export enum LocalPaymentProcessor {
  None = 'None',
  CyberSource = 'CyberSource',
  Checkout = 'Checkout',
  Stripe = 'Stripe',
  Modulr = 'Modulr',
  Plaid = 'Plaid',
  Yapily = 'Yapily',
}

export enum LocalWallets {
  ApplePay = 'Apple Pay',
  GooglePay = 'Google Pay',
}

export enum LocalPartialPaymentMethods {
  None = 'None',
  Partial = 'Partial',
}
