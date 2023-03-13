import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import Button from '../../components/Button/Button';

register(Button, 'custom-button', React, ReactDOM);
