import classNames from 'classnames';
import { MouseEventHandler } from 'react';

const svgClassNames = (disabled: boolean) => {
  return classNames('h-3 w-3 mt-1 ml-1 stroke-controlGrey', {
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
        <span onClick={props.handleClick}>
          <div className="px-2 py-2">
            <svg
              className={svgClassNames(props.disabled)}
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 12.5L7 6.5L0.999999 0.500001" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </span>
      )}

      {props.direction === 'left' && (
        <span onClick={props.handleClick}>
          <div className="px-2 py-2">
            <svg
              className={svgClassNames(props.disabled)}
              width="7"
              height="13"
              viewBox="0 0 7 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5 0.5L0.5 6.5L6.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </span>
      )}
    </>
  );
};

export default DateRangeButton;
