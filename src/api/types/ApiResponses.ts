import { AddressType, CardTokenCreateModes, Currency, PartialPaymentMethods, PaymentProcessor, PaymentRequestEventType, PaymentResult } from "./Enums";

export interface PaymentRequestPageResponse extends PageResponse<PaymentRequest> {}

export type PaymentRequest = {
    id: string;
    merchantID: string;
    amount: number;
    currency: Currency;
    customerID?: string;
    orderID?: string;
    paymentMethodTypes: string;
    description?: string;
    pispAccountID?: string;
    baseOriginUrl: string;
    callbackUrl?: string;
    successWebHookUrl?: string;
    cardAuthorizeOnly: boolean;
    cardCreateToken: boolean;
    cardTokenCreateModes: CardTokenCreateModes;
    ignoreAddressVerification: boolean;
    cardIgnoreCVN: boolean;
    cardProcessorMerchantID?: string;
    paymentProcessor: PaymentProcessor;
    pispRecipientReference?: string;
    lightningInvoice?: string;
    status: PaymentResult;
    hostedPayCheckoutUrl?: string;
    partialPaymentMethod: PartialPaymentMethods;
    inserted: Date;
    insertedSortable: string;
    lastUpdated: Date;
    useHostedPaymentPage: boolean;
    customerEmailAddress?: string;
    cardStripePaymentIntentID?: string;
    cardStripePaymentIntentSecret?: string;
    addresses: PaymentRequestAddress[];
    jwk?: string;
};

export type PaymentRequestMinimal = {
    id: string;
    merchantID: string;
    amount: number;
    currency: Currency;
    merchantName?: string;
    description?: string;
    paymentProcessor: PaymentProcessor;
    callbackUrl?: string;
    cardStripePaymentIntentSecret?: string;
    jwk?: string;
    paymentMethodTypes: string;
    cardTransmitRawDetails: boolean;
    cardProcessorMerchantID?: string;
    ignoreAddressVerification: boolean;
    cardIgnoreCVN: boolean;
    pispRecipientReference?: string;
    useHostedPaymentPage: boolean;
    cardNoPayerAuthentication: boolean;
};

export type PaymentRequestCreate = {
    merchantID: string;
    amount: number;
    currency: Currency;
    customerID?: string;
    orderID?: string;
    paymentMethodTypes: string;
    description?: string;
    pispAccountID?: string;
    baseOriginUrl: string;
    callbackUrl?: string;
    successWebHookUrl?: string;
    cardAuthorizeOnly: boolean;
    cardCreateToken: boolean;
    cardTokenCreateModes: CardTokenCreateModes;
    partialPaymentMethod: PartialPaymentMethods;
    customerEmailAddress?: string;
    shippingFirstName?: string;
    shippingLastName?: string;
    shippingAddressLine1?: string;
    shippingAddressLine2?: string;
    shippingAddressCity?: string;
    shippingAddressCounty?: string;
    shippingAddressPostCode?: string;
    shippingAddressCountryCode?: string;
    shippingPhone?: string;
    shippingEmail?: string;
};

export type PaymentRequestAddress = {
    id: string;
    paymentRequestID: string;
    addressType: AddressType;
    firstName?: string;
    lastName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressCity?: string;
    addressCounty?: string;
    addressPostCode?: string;
    addressCountryCode?: string;
    phone?: string;
    email?: string;
}

export type PaymentRequestEvent = {
    id: string;
    paymentRequestID: string;
    eventType: PaymentRequestEventType;
    amount: number;
    currency: Currency;
    status?: string;
    errorReason?: string;
    errorMessage?: string;
    rawResponse: string;
    rawResponseHash: string;
    cardRequestID?: string;
    cardTransactionID?: string;
    cardTokenCustomerID?: string;
    cardAuthorizationResponseID?: string;
    lightningInvoice?: string;
    pispPaymentServiceProviderID?: string;
    pispPaymentInitiationID?: string;
    pispRedirectUrl?: string;
    pispToken?: string;
    paymentProcessorName: PaymentProcessor
}

export interface PageResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    content: T[];
}

export type ApiError = {
    type?: string,
    title: string,
    status?: number,
    detail: string,
}

export type ApiResponse<T> = {
    data?: T;
    error?: ApiError;
}