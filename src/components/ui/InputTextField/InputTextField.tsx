import React, { useId } from 'react';

export interface InputTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const InputTextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  ({ label, required, maxLength, value, onChange, ...props }, ref) => {
    const textId = useId();

    return (
      <div className="flex flex-col">
        <div className="py-2 flex justify-between">
          <label htmlFor={textId} className="text-default-text font-semibold text-sm leading-4">
            {label}
          </label>

          {required && <div className="text-greyText font-normal text-xs leading-4">REQUIRED</div>}
        </div>
        <input
          ref={ref}
          id={textId}
          maxLength={maxLength}
          type="text"
          value={value}
          onChange={onChange}
          className="pl-3 border border-borderGrey rounded-[0.25rem] h-12 w-full inline-block font-normal text-sm/6 text-default-text"
          {...props}
        />
        {maxLength && (
          <div className="text-right mt-2 text-greyText font-normal text-[0.813rem] leading-5">
            {value?.toString().length}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

export default InputTextField;
