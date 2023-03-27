import { format } from 'date-fns';
import { getDateFormat } from '../../../utils/formatters';

const DateRangeInput = (props: any) => {
  let fromDate;
  let toDate;
  let formattedDate;

  if (props.value[0]) {
    fromDate = new Date(props.value[0] as Date);
  }

  if (props.value[1]) {
    toDate = new Date(props.value[1] as Date);
  }

  if (fromDate && toDate) {
    const dateFormat = getDateFormat(fromDate);

    if (fromDate.getTime() === toDate.getTime()) {
      formattedDate = `${format(fromDate, dateFormat)}`;
    } else {
      formattedDate = `${format(fromDate, dateFormat)} - ${format(toDate, dateFormat)}`;
    }
  } else if (fromDate) {
    formattedDate = `${format(fromDate, getDateFormat(fromDate))}`;
  }

  return (
    <div className="flex px-2">
      <div className="pt-1 pr-1">
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
            <path d="M0.375 4.875H11.625" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.375 3V0.375" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.625 3V0.375" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_1362_8741">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div>
        <button className="pl-1" onClick={props.openCalendar}>
          {formattedDate}
        </button>
      </div>
    </div>
  );
};

export default DateRangeInput;
