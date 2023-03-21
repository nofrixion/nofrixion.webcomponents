import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import PaymentRequestTable from '../../components/functional/PaymentRequestTable/PaymentRequestTable';

register(PaymentRequestTable, 'payment-request-table', React, ReactDOM);
