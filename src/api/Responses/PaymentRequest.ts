import { Currency, CardTokenCreateModes, PaymentProcessor, PaymentResult, PartialPaymentMethods } from "../Enums";
import { PageResponse } from "./PageResponse";

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
};