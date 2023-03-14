import { html } from 'lit-html';

import './WebCard';

export default {
  title: 'Card',
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    href: { control: 'text' },
    // size: String,
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ name, description, imageSrc, imageAlt, href }) =>
  html`<custom-card
    .name=${name}
    .description=${description}
    .imageSrc=${imageSrc}
    .imageAlt=${imageAlt}
    .href=${href}
  ></custom-card>`;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  name: 'Travel',
  description: 'Daily commute essentials',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
  imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
  href: '#',
};

export const Secondary = Template.bind({});

Secondary.args = {
  name: 'Desk and Office',
  description: 'Work from home accessories',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
  imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
  href: '#',
};
