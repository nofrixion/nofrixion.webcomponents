import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    href: { control: 'text' },
    // size: String,
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

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
