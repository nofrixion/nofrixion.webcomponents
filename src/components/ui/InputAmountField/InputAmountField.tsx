import { useEffect, useId, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { Currency, CurrencySymbol } from '../../../api/types/Enums';

export interface InputAmountFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const actionItemClassNames =
  'group text-sm leading-6 rounded-1 flex items-center relative select-none outline-none cursor-pointer';

const actionItem = cva(actionItemClassNames, {
  variants: {
    intent: {
      neutral: ['data-[highlighted]:text-greyText'],
      selected: ['text-[#009999] data-[highlighted]:cursor-default'],
    },
  },
  defaultVariants: {
    intent: 'neutral',
  },
});

const InputAmountField = ({ value, currency, onCurrencyChange, ...props }: InputAmountFieldProps) => {
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  useEffect(() => {
    setCurrencySymbol(selectedCurrency === Currency.EUR ? CurrencySymbol.EUR : CurrencySymbol.GBP);
    onCurrencyChange(selectedCurrency);
  }, [selectedCurrency]);

  return (
    <div className="flex flex-col">
      <div className="flex w-[13.938rem] py-[0.438rem] border border-borderGrey rounded-[0.25rem] justify-between">
        <div className="flex">
          <span className="flex items-center ml-3 mr-2 font-normal text-sm text-greyText">{currencySymbol}</span>
          <input
            type="number"
            className="w-32 font-normal text-sm text-defaultText appearance-none"
            value={value}
            {...props}
          />
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div className="flex items-center my-2 mr-3 text-greyText font-normal leading-4 hover:text-defaultText bg-transparent text-sm whitespace-nowrap cursor-pointer select-none stroke-greyText hover:stroke-defaultText">
              <ResizableComponent>
                <span className="mr-2">{selectedCurrency}</span>
              </ResizableComponent>

              <svg width="10" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.25L5 5.25L9 1.25" strokeLinecap="square" />
              </svg>
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content asChild forceMount sideOffset={5} className="px-6">
              <motion.div
                className="bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] p-4 space-y-4"
                initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
                animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
              >
                <DropdownMenu.Item
                  className={actionItem({ intent: selectedCurrency === Currency.EUR ? 'selected' : 'neutral' })}
                  onClick={() => setSelectedCurrency(Currency.EUR)}
                >
                  <span>{Currency.EUR}</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={actionItem({ intent: selectedCurrency === Currency.GBP ? 'selected' : 'neutral' })}
                  onClick={() => setSelectedCurrency(Currency.GBP)}
                >
                  <span>{Currency.GBP}</span>
                </DropdownMenu.Item>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default InputAmountField;
