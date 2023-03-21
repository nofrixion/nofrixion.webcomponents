export enum Currency {
  None = 'None',
  GBP = 'GBP',
  EUR = 'EUR',
  LBTC = 'LBTC',
  BTC = 'BTC',
}

export enum CardTokenCreateModes {
  None = 'None',
  ConsentNotRequired = 'ConsentNotRequired',
  UserConsentRequired = 'UserConsentRequired',
}

export enum PaymentProcessor {
  None = 'None',
  CyberSource = 'CyberSource',
  Checkout = 'Checkout',
  Stripe = 'Stripe',
  Modulr = 'Modulr',
  Plaid = 'Plaid',
  Yapily = 'Yapily',
}

export enum PaymentResult {
  None = 'None',
  FullyPaid = 'FullyPaid',
  Checkout = 'Checkout',
  PartiallyPaid = 'PartiallyPaid',
  OverPaid = 'OverPaid',
  Voided = 'Voided',
  Authorized = 'Authorized',
}

export enum PartialPaymentMethods {
  None = 'None',
  Partial = 'Partial',
}

export enum AddressType {
  Unknown = 'Unknown',
  Shipping = 'Shipping',
  Billing = 'Billing',
}

export enum PaymentRequestEventType {
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

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum PaymentRequestStatus {
  All = 'All',
  None = 'None',
  FullyPaid = 'FullyPaid',
  PartiallyPaid = 'PartiallyPaid',
  OverPaid = 'OverPaid',
  Voided = 'Voided',
  Authorized = 'Authorized',
}
