import { html } from "lit-html";

import "./WebButton";

export default {
  title: "Button",
  argTypes: {
    primary: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "inline-radio" },
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ primary, label, size }) =>
  html`<custom-button
    .primary=${primary}
    .label=${label}
    .size=${size}
  ></custom-button>`;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "Button",
  size: "medium",
};
