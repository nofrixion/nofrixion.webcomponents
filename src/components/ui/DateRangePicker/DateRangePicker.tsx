import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { dateRanges } from '../../../utils/constants';
import { getDateFormat, getDateInPast } from '../../../utils/formatters';

export type DateRange = {
  fromDate: Date;
  toDate: Date;
};

interface DateRangeFilterProps {
  rangeText: string;
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ rangeText = dateRanges.last90Days, onDateChange }: DateRangeFilterProps) => {
  const [selectRangeText, setSelectRangeText] = useState(rangeText);
  const [dateRangeText, setDateRangeText] = useState('');

  const pillClasses =
    'bg-[#EDF2F7] px-3 py-1.5 text-sm leading-6 whitespace-nowrap border-[1px] border-[#D5DBDD] cursor-pointer';

  const getDateRangeText = (toDate: Date, fromDate: Date): string => {
    return `${format(toDate, getDateFormat(toDate, fromDate))} - ${format(fromDate, getDateFormat(toDate, fromDate))}`;
  };

  useEffect(() => {
    setSelectRangeText(rangeText);
  }, [rangeText]);

  useEffect(() => {
    let toDate = new Date();

    switch (selectRangeText) {
      case dateRanges.today:
        setDateRangeText(format(new Date(), 'MMM do'));
        onDateChange({ fromDate: new Date(), toDate: getDateInPast(0, true) });
        break;
      case dateRanges.yesterday:
        toDate = getDateInPast(1, true);

        setDateRangeText(format(toDate, 'MMM do'));
        onDateChange({ fromDate: getDateInPast(1, false), toDate: toDate });
        break;
      case dateRanges.last7Days:
        toDate = getDateInPast(7, true);
        setDateRangeText(getDateRangeText(new Date(), toDate));
        onDateChange({ fromDate: new Date(), toDate: toDate });
        break;
      case dateRanges.last30Days:
        toDate = getDateInPast(30, true);
        setDateRangeText(getDateRangeText(new Date(), toDate));
        onDateChange({ fromDate: new Date(), toDate: toDate });
        break;
      case dateRanges.last90Days:
        toDate = getDateInPast(90, true);
        setDateRangeText(getDateRangeText(new Date(), toDate));
        onDateChange({ fromDate: new Date(), toDate: toDate });
        break;
      case dateRanges.custom:
        setDateRangeText('Last 90 days');
        break;
    }
  }, [selectRangeText]);

  return (
    <div className="flex defaultText">
      <div className={classNames(pillClasses, 'rounded-l-full border-r-0 flex flex-col-2 space-x-2')}>
        <div>
          <span>{selectRangeText}</span>
        </div>
        <div className="py-2.5">
          <svg
            className="stroke-defaultText"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L5 5L1 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className={classNames(pillClasses, 'rounded-r-full flex flex-col-2 space-x-2')}>
        <div className="py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="14"
            height="14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        </div>
        <div>
          <span>{dateRangeText}</span>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
