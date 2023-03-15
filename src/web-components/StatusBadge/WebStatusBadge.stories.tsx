import { html } from 'lit-html';

import './WebStatusBadge';

export default {
  title: 'StatusBadge',
  argTypes: {
    status: { control: 'inline-radio', options: ['UNPAID', 'PARTIAL', 'PAID'] },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ status }) => html`<paymentrequest-status .status=${status}> </paymentrequest-status>`;

//👇 Each story then reuses that template
export const UnpaidBadge = Template.bind({});

UnpaidBadge.args = {
  status: 'UNPAID',
};

export const PartiallyPaidBadge = Template.bind({});

PartiallyPaidBadge.args = {
  status: 'PARTIAL',
};

export const PaidBadge = Template.bind({});

PaidBadge.args = {
  status: 'PAID',
};
