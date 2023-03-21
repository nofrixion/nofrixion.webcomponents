import { html } from 'lit-html';
import { apiUrls } from '../../utils/constants';

import './WebPaymentRequestTable';

export default {
  title: 'Payment Request Table',
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: {
        type: 'select',
        options: Object.values(apiUrls),
      },
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ token, apiUrl }) =>
  html`<payment-request-table .token=${token} .apiUrl=${apiUrl}></payment-request-table>`;

//👇 Each story then reuses that template
export const Dev = Template.bind({});

Dev.args = {
  token: 'eyJhbGciOiJIUz...',
  apiUrl: apiUrls.dev,
};
