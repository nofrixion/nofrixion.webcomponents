import { html } from 'lit-html';

import './WebTitle';

export default {
  title: 'Title',
  argTypes: {
    label: {
      control: 'text',
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ label }) => html`<custom-title .label=${label}></custom-title>`;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  label: 'Primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  label: 'Secondary',
};
