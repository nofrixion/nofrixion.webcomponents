import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/atoms';

const cancelDefaults = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
};

const preventEvents = (open: boolean) => {
  const items = document.querySelectorAll('[data-radix-collection-item]');

  items.forEach((item) => {
    const fn = open ? 'addEventListener' : 'removeEventListener';
    item[fn]('touchstart', cancelDefaults);
  });
};

const Select: React.FC<SelectPrimitive.SelectProps> = ({ onOpenChange, children, ...props }) => {
  const handleOpenChange = (open: boolean) => {
    preventEvents(open);
    onOpenChange && onOpenChange(open);
  };

  return (
    <SelectPrimitive.Root onOpenChange={handleOpenChange} {...props}>
      {children}
    </SelectPrimitive.Root>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { subText?: string }
>(({ className, children, subText, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex flex-col min-h-[2.5rem] w-full select-none rounded-md font-semibold text-sm/6 bg-transparent px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <div
      className={cn('flex w-full items-center space-x-2', {
        'space-x-2 justify-between md:space-x-0': subText,
        'justify-between': !subText,
      })}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="arrow-down/8" />
      </SelectPrimitive.Icon>
    </div>
    {/* Show sub text only on mobile */}
    {subText && <span className="block md:hidden text-greyText text-xs font-normal">{subText}</span>}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content ref={ref} position={position} asChild {...props} sideOffset={5}>
        <motion.div
          className={cn(
            'relative min-w-[8rem] overflow-hidden rounded-md border bg-white px-3 py-3 shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)]',
            className,
          )}
          initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
          animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
          // transition={{ duration: 2 }}
        >
          <SelectPrimitive.Viewport
            className={cn('space-y-4', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full')}
          >
            {children}
          </SelectPrimitive.Viewport>
        </motion.div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full px-3 py-0.5 cursor-default select-none items-center rounded-full text-sm outline-none transition active:bg-greyBg lg:focus:bg-greyBg focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:text-[#099]',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
