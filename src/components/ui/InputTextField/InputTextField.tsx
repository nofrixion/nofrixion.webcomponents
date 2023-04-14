import { useId } from 'react';

export interface InputTextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  optional: boolean;
  onChangeInput: (value: string) => void;
}

const InputTextField = ({ label, value, optional, onChangeInput, ...props }: InputTextFieldProps) => {
  const textId = useId();

  return (
    <div className="flex flex-col w-fit">
      <div className="py-2 flex justify-between">
        <label htmlFor={textId} className="text-defaultText font-semibold text-sm leading-4">
          {label}
        </label>

        {optional && <div className="text-greyText font-normal text-xs leading-4">OPTIONAL</div>}
      </div>
      <input
        id={textId}
        type="text"
        className="pl-3 border border-borderGrey rounded-[0.25rem] h-12 w-[27rem] inline-block font-normal text-sm text-defaultText"
        onChange={(e) => {
          onChangeInput(e.target.value);
        }}
        value={value}
        {...props}
      />
    </div>
  );
};

export default InputTextField;
