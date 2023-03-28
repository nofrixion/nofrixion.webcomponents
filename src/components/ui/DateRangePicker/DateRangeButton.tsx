import classNames from 'classnames';
import { MouseEventHandler } from 'react';

const svgClassNames = (disabled: boolean) => {
  return classNames('h-3 w-3 stroke-controlGrey', {
    'cursor-default': disabled,
    'cursor-pointer hover:stroke-controlGreyHover': !disabled,
  });
};

interface DateRangeButtonProps {
  direction: string;
  handleClick: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean;
}

const DateRangeButton = (props: DateRangeButtonProps) => {
  return (
    <>
      {props.direction === 'right' && (
        <button className="px-2 py-2" onClick={props.handleClick}>
          <svg
            className={svgClassNames(props.disabled)}
            width="6"
            height="12"
            viewBox="0 0 6 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 12.5L7 6.5L0.999999 0.500001" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {props.direction === 'left' && (
        <button className="px-2 py-2" onClick={props.handleClick}>
          <svg
            className={svgClassNames(props.disabled)}
            width="6"
            height="12"
            viewBox="0 0 6 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5 0.5L0.5 6.5L6.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
};

export default DateRangeButton;
