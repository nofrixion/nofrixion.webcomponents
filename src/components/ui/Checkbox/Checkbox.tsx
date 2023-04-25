import * as RadixCheckbox from '@radix-ui/react-checkbox';
import CheckedIcon from '../../../assets/icons/checked-icon.svg';
import { useId } from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

interface CheckboxProps {
  label: string;
  infoText?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = ({ label, value, infoText, onChange }: CheckboxProps) => {
  const id = useId();

  return (
    <div className="flex items-center select-none cursor-pointer text-sm w-fit">
      <RadixCheckbox.Root
        className="bg-white outline outline-1 outline-borderGrey border-borderGrey rounded-sm w-4 h-4"
        id={id}
        checked={value}
        onCheckedChange={onChange}
      >
        <RadixCheckbox.Indicator className="w-full h-full">
          <img src={CheckedIcon} alt="Checked icon" className="m-auto" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="cursor-pointer pl-3 pr-2" htmlFor={id}>
        {label}
      </label>

      {infoText && <InfoTooltip content={infoText} />}
    </div>
  );
};

export default Checkbox;
