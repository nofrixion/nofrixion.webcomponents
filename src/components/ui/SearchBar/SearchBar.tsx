import searchIconDisabled from '../../../assets/icons/search-icon-disabled.svg';
import searchIconEnabled from '../../../assets/icons/search-icon-enabled.svg';
import closeIcon from '../../../assets/images/nf_close.svg';
import classNames from 'classnames';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ maxLength = 100, value, setValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const onClear = () => {
      setValue('');
    };

    return (
      <div className="relative inline-flex">
        <input
          ref={ref}
          type="text"
          maxLength={maxLength}
          className={classNames(
            'inline outline outline-1 hover:outline-borderGrey focus:outline-borderGrey ' +
              'focus:rounded-lg focus:w-48 py-2 pl-9 pr-1 text-sm placeholder:text-greyText ' +
              'placeholder:opacity-100 text-defaultText bg-[12px] bg-no-repeat transition-all',
            {
              'outline-borderGrey rounded-lg w-48 pr-9': value,
              'rounded w-24': !value,
            },
          )}
          style={{
            backgroundImage: value || isFocused ? `url(${searchIconEnabled})` : `url(${searchIconDisabled})`,
            outlineColor: 'transparent',
          }}
          placeholder="Search"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          {...props}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              className="outline-none cursor-pointer p-0 m-0 absolute right-4 top-[calc(50%-0.25rem)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClear}
            >
              <img src={closeIcon} alt="Clear" title="Clear" className="w-2 h-2" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default SearchBar;
