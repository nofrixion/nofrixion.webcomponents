import { format, isEqual } from 'date-fns';
import { useEffect, useState } from 'react';
import { getDateFormat } from '../../../utils/formatters';
import ResizableComponent from '../ResizableComponent/ResizableComponent';

interface DateRangeInputProps {
  value: string[]; // [fromDate, toDate]
  openCalendar: () => void;
}

const DateRangeInput = (props: DateRangeInputProps) => {
  const [formattedDate, setFormattedDate] = useState<string>('');
  let fromDate: Date | undefined;
  let toDate: Date | undefined;

  if (props.value[0]) {
    fromDate = new Date(props.value[0]);
  }

  if (props.value[1]) {
    toDate = new Date(props.value[1]);
  }

  useEffect(() => {
    if (fromDate && toDate) {
      const dateFormat = getDateFormat(fromDate);

      if (isEqual(fromDate.getTime(), toDate.getTime())) {
        setFormattedDate(`${format(fromDate, dateFormat)}`);
      } else {
        setFormattedDate(`${format(fromDate, dateFormat)} - ${format(toDate, dateFormat)}`);
      }
    } else if (fromDate) {
      setFormattedDate(`${format(fromDate, getDateFormat(fromDate))}`);
    }
  }, [fromDate, toDate]);

  return (
    <div className="flex">
      <div className="pt-1.5 pr-1">
        <svg
          className="ml-2"
          width="1em"
          height="1em"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1362_8741)">
            <path
              d="M10.875 1.875H1.125C0.710785 1.875 0.375 2.21079 0.375 2.625V10.875C0.375 11.2892 0.710785 11.625 1.125 11.625H10.875C11.2892 11.625 11.625 11.2892 11.625 10.875V2.625C11.625 2.21079 11.2892 1.875 10.875 1.875Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M0.375 4.875H11.625" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.375 3V0.375" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.625 3V0.375" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1362_8741">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <ResizableComponent>
        <button className="pl-1" onClick={props.openCalendar}>
          {formattedDate}
        </button>
      </ResizableComponent>
    </div>
  );
};

export default DateRangeInput;
