import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { register } from 'react-to-html-element';
import Title from '../../components/ui/Title/Title';

register(Title, 'custom-title', React, ReactDOM);
