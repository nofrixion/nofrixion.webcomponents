import searchIconDisabled from '../../../assets/icons/search-icon-disabled.svg';
import searchIconEnabled from '../../../assets/icons/search-icon-enabled.svg';
import classNames from 'classnames';
import React, { useState } from 'react';

const SearchBar = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ maxLength = 100, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        maxLength={maxLength}
        className={classNames(
          'inline outline outline-1 hover:outline-borderGrey focus:outline-borderGrey ' +
            'focus:rounded-lg focus:w-48 py-2 pl-9 pr-1 text-sm placeholder-greyText' +
            'text-defaultText bg-[12px] bg-no-repeat transition-all',
          {
            'outline-borderGrey': value,
            rounded: !value,
            'rounded-lg': value,
            'w-24': !value,
            'w-48': value,
          },
        )}
        style={{
          backgroundImage: value ? `url(${searchIconEnabled})` : `url(${searchIconDisabled})`,
          outlineColor: 'transparent',
        }}
        placeholder="Search"
        onChange={onChange}
        value={value}
        {...props}
      />
    );
  },
);

export default SearchBar;
