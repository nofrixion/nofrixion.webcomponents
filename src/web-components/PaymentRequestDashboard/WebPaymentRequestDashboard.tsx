import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import PaymentRequestDashboard from '../../components/ui/PaymentRequestDashboard/PaymentRequestDashboard';

register(PaymentRequestDashboard, 'payment-request-dashboard', React, ReactDOM);
