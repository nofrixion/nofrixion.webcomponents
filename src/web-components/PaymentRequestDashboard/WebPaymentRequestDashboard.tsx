import React from 'react';
import ReactDOM from 'react-dom/client';
import PaymentRequestDashboard from '../../components/functional/PaymentRequestDashboard/PaymentRequestDashboard';

import r2wc from 'react-to-webcomponent';

const WebPaymentRequestDashboard = r2wc(PaymentRequestDashboard, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    merchantId: 'string',
  },
});

customElements.define('payment-request-dashboard', WebPaymentRequestDashboard);
