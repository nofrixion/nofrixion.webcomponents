import { StoryFn, Meta } from '@storybook/react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/atoms/Sheet/Sheet';
import { useState } from 'react';

export default {
  title: 'Atoms/Sheet',
  component: Sheet,
  argTypes: {
    subText: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
} as Meta<typeof Sheet>;

type Story = StoryFn<typeof Sheet>;

export const Showcase: Story = (args) => {
  return (
    <Sheet {...args}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const NoTrigger: Story = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        Toggle
      </button>

      <Sheet open={open} onOpenChange={setOpen} {...args}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
