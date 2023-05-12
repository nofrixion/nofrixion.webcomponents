import React, { useId } from 'react';

export interface InputTextAreaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  maxLength?: number;
}
const InputTextAreaField = React.forwardRef<HTMLTextAreaElement, InputTextAreaFieldProps>(
  ({ label, onChange, value, required, maxLength, ...props }, ref) => {
    const textId = useId();

    return (
      <div className="flex flex-col w-fit">
        <div className="py-2 flex justify-between">
          <label htmlFor={textId} className="text-defaultText font-semibold text-sm leading-4">
            {label}
          </label>

          {required && <div className="text-greyText font-normal text-xs leading-4">REQUIRED</div>}
        </div>
        <textarea
          id={textId}
          className="resize-none pl-3 pt-3 border border-borderGrey rounded-[0.25rem] h-28 w-[27rem] inline-block font-normal text-sm text-defaultText"
          ref={ref}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
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

export default InputTextAreaField;
