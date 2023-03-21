import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import Card from '../../components/ui/Card/Card';

register(Card, 'custom-card', React, ReactDOM);
