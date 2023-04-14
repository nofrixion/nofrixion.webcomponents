import { useEffect, useId, useState } from 'react';

export interface InputTextAreaFieldProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  optional: boolean;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextAreaField = ({ label, value, optional, onChange, ...props }: InputTextAreaFieldProps) => {
  const textId = useId();
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(event.target.value.length);

    onChange && onChange(event);
  };

  useEffect(() => {
    if (value) {
      setCharacterCount(value.length);
    }
  }, []);

  return (
    <div className="flex flex-col w-fit">
      <div className="py-2 flex justify-between">
        <label htmlFor={textId} className="text-defaultText font-semibold text-sm leading-4">
          {label}
        </label>

        {optional && <div className="text-greyText font-normal text-xs leading-4">OPTIONAL</div>}
      </div>
      <textarea
        id={textId}
        className="resize-none pl-3 pt-3 border border-borderGrey rounded-[0.25rem] h-28 w-[27rem] inline-block font-normal text-sm text-defaultText"
        value={value}
        onChange={(e) => handleChange(e)}
        {...props}
      />
      <div className="text-right mt-2 text-greyText font-normal text-[0.813rem] leading-5">
        {characterCount}/{props.maxLength}
      </div>
    </div>
  );
};

export default InputTextAreaField;
