import { StoryFn, Meta } from '@storybook/react';

import { Icon } from '@/components/ui/atoms';
import { Icons } from '@/components/ui/atoms/Icon/Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const ShowcaseAll = Template.bind({});
ShowcaseAll.argTypes = {
  name: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
};
ShowcaseAll.decorators = [
  (_, props) => {
    // Map object to get keys
    const icons = Object.keys(Icons) as Array<keyof typeof Icons>;

    return (
      <div className="-m-2 flex flex-wrap">
        {icons.map((iconName, index) => (
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-4 text-xs m-2">
            <Icon key={index} name={iconName} />
            <span>{iconName}</span>
          </div>
        ))}
      </div>
    );
  },
];

export const Regular = Template.bind({});
Regular.args = {
  name: 'next/24',
};
