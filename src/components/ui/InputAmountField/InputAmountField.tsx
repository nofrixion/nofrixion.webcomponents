import React, { useEffect, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { Currency } from '@nofrixion/moneymoov';
import { localCurrency } from '../../../utils/constants';

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export interface InputAmountFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
const InputAmountField: React.FC<InputAmountFieldProps> = ({ currency, onCurrencyChange, onChange, ...props }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(localCurrency.eur);

  const maskOptions = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 7,
    allowNegative: false,
    allowLeadingZeroes: false,
  };

  const currencyMask = createNumberMask({
    ...maskOptions,
  });

  useEffect(() => {
    setSelectedCurrency(currency === Currency.EUR ? localCurrency.eur : localCurrency.gbp);
  }, []);

  useEffect(() => {
    onCurrencyChange(selectedCurrency.code);
  }, [selectedCurrency]);

  return (
    <div className="flex w-full h-12 border border-borderGrey rounded justify-between">
      <div className="flex relative w-full">
        <span className="flex absolute inset-y-0 pointer-events-none items-center ml-3 font-normal text-sm text-greyText">
          {selectedCurrency.symbol}
        </span>
        <MaskedInput
          className="block w-full pl-7 mr-1 rounded font-normal text-sm text-default-text appearance-none"
          mask={currencyMask}
          inputMode="decimal"
          onChange={(e) => {
            const masked = e.target.value;
            e.target.value = e.target.value.replace(/[^\d\.\-]/g, '');
            onChange && onChange(e);
            e.target.value = masked;
          }}
          {...props}
        />
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="flex h-full items-center pl-3 mr-3 text-greyText font-normal leading-4 hover:text-default-text bg-transparent text-sm whitespace-nowrap cursor-pointer select-none stroke-greyText hover:stroke-defaultText">
            <ResizableComponent>
              <span className="mr-2">{selectedCurrency.code}</span>
            </ResizableComponent>

            <svg width="10" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.25L5 5.25L9 1.25" strokeLinecap="square" />
            </svg>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content asChild forceMount sideOffset={5} className="px-6 z-10">
            <motion.div
              className="bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] p-4 space-y-4"
              initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
              animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
            >
              <DropdownMenu.Item
                className={actionItem({ intent: selectedCurrency === localCurrency.eur ? 'selected' : 'neutral' })}
                onClick={() => setSelectedCurrency(localCurrency.eur)}
              >
                <span>{Currency.EUR}</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={actionItem({ intent: selectedCurrency === localCurrency.gbp ? 'selected' : 'neutral' })}
                onClick={() => setSelectedCurrency(localCurrency.gbp)}
              >
                <span>{Currency.GBP}</span>
              </DropdownMenu.Item>
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default InputAmountField;
