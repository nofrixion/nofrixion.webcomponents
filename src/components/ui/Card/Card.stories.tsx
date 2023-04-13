import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Card from './Card';

export default {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    href: { control: 'text' },
    size: { control: 'inline-radio', options: ['medium', 'large'] },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  name: 'Travel',
  description: 'Daily commute essentials',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
  imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
  href: '#',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  name: 'Desk and Office',
  description: 'Work from home accessories',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
  imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
  href: '#',
  size: 'large',
};
