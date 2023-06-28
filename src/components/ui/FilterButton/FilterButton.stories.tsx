import disabledTagIcon from '../../../assets/icons/tag-icon-disabled.svg';
import enabledTagIcon from '../../../assets/icons/tag-icon-enabled.svg';
import disabledCurrencyIcon from '../../../assets/icons/currency-icon-disabled.svg';
import enabledCurrencyIcon from '../../../assets/icons/currency-icon-enabled.svg';
import FilterButton from './FilterButton';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'UI/Filter Button',
  component: FilterButton,
} as Meta<typeof FilterButton>;

const Template: StoryFn<typeof FilterButton> = (args) => {
  return <FilterButton {...args} />;
};

export const Tags = Template.bind({});
Tags.args = {
  defaultIconSource: disabledTagIcon,
  highlightedIconSource: enabledTagIcon,
  label: 'Tags',
};

export const Currency = Template.bind({});
Currency.args = {
  defaultIconSource: disabledCurrencyIcon,
  highlightedIconSource: enabledCurrencyIcon,
  label: 'Currency',
};
