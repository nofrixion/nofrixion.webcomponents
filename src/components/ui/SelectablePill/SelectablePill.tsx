import classNames from 'classnames';
import { useId, useState } from 'react';
export interface SelectablePillProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect?: (selected: boolean) => void;
  onValueChange?: (value: string) => void;
  groupName?: string;
}

const SelectablePill: React.FC<SelectablePillProps> = ({
  label,
  value,
  selected,
  onSelect,
  onValueChange,
  groupName,
}) => {
  const commonClassNames =
    'inline px-2 py-1 rounded-full border border-solid transition-colors cursor-pointer text-center text-13px leading-4 select-none';
  const uniqueId = useId();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (groupName && onValueChange) {
      onValueChange(event.target.value);
    } else if (onSelect) {
      onSelect(event.target.checked);
    }
  };

  return (
    <div className="flex space-x-2">
      <span>
        <input
          type={groupName ? 'radio' : 'checkbox'}
          id={'rd-' + uniqueId}
          className="hidden"
          name={groupName}
          value={value}
          checked={selected}
          onChange={onChange}
        />
        <label
          htmlFor={'rd-' + uniqueId}
          className={classNames(commonClassNames, {
            'border-borderGrey hover:border-borderGreyHighlighted bg-white text-greyText': !selected,
            'border-selectedPill bg-selectedPill text-white': selected,
          })}
        >
          {label}
        </label>
      </span>
    </div>
  );
};

export default SelectablePill;
