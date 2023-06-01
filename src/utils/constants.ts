export const apiUrls = {
  local: 'https://localhost:44323/api/v1',
  dev: 'https://api-dev.nofrixion.com/api/v1',
  sandbox: 'https://api-sandbox.nofrixion.com/api/v1',
  production: 'https://api.nofrixion.com/api/v1',
};

export const dateRanges = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7Days: 'Last 7 Days',
  last30Days: 'Last 30 Days',
  last90Days: 'Last 90 Days',
};

export const localCurrency = {
  gbp: { code: 'GBP', symbol: '£' },
  eur: { code: 'EUR', symbol: '€' },
};

export const defaultUserPaymentDefaults = {
  paymentMethodsDefaults: {
    pisp: true,
    pispPriorityBank: false,
    pispPriorityBankID: '',
    card: true,
    wallet: true,
    lightning: false,
    cardAuthorizeOnly: false,
  },
  paymentConditionsDefaults: {
    allowPartialPayments: false,
  },
  notificationEmailsDefaults: {
    emailAddresses: '',
  },
};
