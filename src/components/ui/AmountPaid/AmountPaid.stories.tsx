import { StoryFn, Meta } from '@storybook/react';
import AmountPaid from './AmountPaid';
import { Currency } from '../../../api/types/Enums';

export default {
  title: 'UI/AmountPaid',
  component: AmountPaid,
} as Meta<typeof AmountPaid>;

const Template: StoryFn<typeof AmountPaid> = (args) => {
  return (
    <>
      <div className="w-[200px]">
        <AmountPaid {...args} />
      </div>
    </>
  );
};

export const Showcase = Template.bind({});
Showcase.args = {
  amountPaid: 23.45,
  totalAmount: 100.0,
  currency: Currency.EUR,
};
