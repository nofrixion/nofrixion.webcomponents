export enum Currency{
    None = "None",
    GBP = "GBP",
    EUR = "EUR",
    LBTC = "LBTC",
    BTC = "BTC"
}

export enum CardTokenCreateModes{
    None = "None",
    ConsentNotRequired = "ConsentNotRequired",
    UserConsentRequired = "UserConsentRequired",
}

export enum PaymentProcessor{
    None = "None",
    CyberSource = "CyberSource",
    Checkout = "Checkout",
    Stripe = "Stripe",
    Modulr = "Modulr",
    Plaid = "Plaid",
    Yapily = "Yapily",
}

export enum PaymentResult{
    None = "None",
    FullyPaid = "FullyPaid",
    Checkout = "Checkout",
    PartiallyPaid = "PartiallyPaid",
    OverPaid = "OverPaid",
    Voided = "Voided",
    Authorized = "Authorized",
}

export enum PartialPaymentMethods{
    None= "None",
    Partial = "Partial",
}