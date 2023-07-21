import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface SelectProps {
  options: SelectOption[];
  selected: SelectOption;
  onChange: (value: SelectOption) => void;
}

export interface SelectOption {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({ options, selected: selectedOption, onChange }) => {
  const onChangeValue = (value: SelectOption) => {
    onChange(value);
  };
  return (
    <Listbox
      value={selectedOption.value}
      onChange={(value) => onChangeValue(options.find((o) => o.value === value) ?? options[0])}
    >
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-positiveActionBackground text-sm/4 px-3 py-4 border border-borderGrey font-medium">
          <span className="block truncate pr-2">{selectedOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 stroke-defaultText hover:stroke-controlGrey">
            <svg width="10" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.25L5 5.25L9 1.25" strokeLinecap="square" />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm/4 z-10">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${active ? 'bg-greyBg' : 'text-gray-900'}`
                }
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium text-[#009999]' : 'font-normal'}`}>
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
