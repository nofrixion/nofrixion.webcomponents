import React, { useId, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimateHeightWrapper from '@/components/ui/utils/AnimateHeight';

export interface InputTextAreaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  maxLength?: number;
  validation?: (value: string) => string | undefined;
  error?: string;
}
const InputTextAreaField = React.forwardRef<HTMLTextAreaElement, InputTextAreaFieldProps>(
  ({ label, onChange, onBlur, validation, value, required, maxLength, ...props }, ref) => {
    const textId = useId();

    const [error, setError] = useState<string>();

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e);

      if (!validation || !error) {
        return;
      }

      setError(validation(e.target.value));
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(e);

      if (!validation) {
        return;
      }

      setError(validation(e.target.value));
    };

    return (
      <div>
        <div className="flex flex-col">
          <div className="py-2 flex justify-between">
            <label htmlFor={textId} className="text-default-text font-semibold text-sm leading-4">
              {label}
            </label>

            {required && <div className="text-greyText font-normal text-xs leading-4">REQUIRED</div>}
          </div>
          <textarea
            id={textId}
            className="resize-none pl-3 pt-3 border border-borderGrey rounded-[0.25rem] h-28 inline-block font-normal text-sm text-default-text"
            ref={ref}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
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
        <AnimatePresence>
          {error && (
            <AnimateHeightWrapper layoutId={`error-${label}`}>
              <div className="mt-2 bg-[#FCF5CF] text-sm p-3 rounded">{error}</div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default InputTextAreaField;
