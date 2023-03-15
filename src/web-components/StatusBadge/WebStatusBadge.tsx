import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import StatusBadge from '../../components/StatusBadge/StatusBadge';

register(StatusBadge, 'paymentrequest-status', React, ReactDOM);
