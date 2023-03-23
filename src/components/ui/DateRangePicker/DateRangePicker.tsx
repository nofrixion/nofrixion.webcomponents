import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { dateRanges } from '../../../utils/constants';

export type DateRange = {
  fromDate: Date;
  toDate: Date;
};

interface DateRangeFilterProps {
  rangeText: string;
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ rangeText, onDateChange }: DateRangeFilterProps) => {
  const [selectRangeText, setSelectRangeText] = useState(rangeText);
  const [dateRangeText, setDateRangeText] = useState('');

  const pillClasses = 'bg-[#EDF2F7] px-3 py-1.5 text-sm leading-6 whitespace-nowrap border-[1px] border-[#D5DBDD]';

  const getDateFormat = (toDate: Date, fromDate: Date): string => {
    if (toDate.getFullYear() !== fromDate.getFullYear()) {
      return 'MMM do, y';
    }

    return 'MMM do';
  };

  const getDateRangeText = (toDate: Date, fromDate: Date): string => {
    return `${format(toDate, getDateFormat(toDate, fromDate))} - ${format(fromDate, getDateFormat(toDate, fromDate))}`;
  };

  const getDateInPast = (daysToGoBack: number): Date => {
    let date = new Date();

    date.setDate(date.getDate() - daysToGoBack);
    date.setHours(0, 0, 0, 0);

    return date;
  };

  useEffect(() => {
    setSelectRangeText(rangeText);
  }, [rangeText]);

  useEffect(() => {
    switch (selectRangeText) {
      case dateRanges.today:
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        setDateRangeText(format(today, 'MMM do'));
        onDateChange({ fromDate: new Date(), toDate: today });
        break;
      case dateRanges.yesterday:
        // TODO: Fix this
        // Make sure hours are correct
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        setDateRangeText(format(getDateInPast(1), 'MMM do'));
        onDateChange({ fromDate: yesterday, toDate: getDateInPast(1) });
        break;
      case dateRanges.last7Days:
        setDateRangeText(getDateRangeText(new Date(), getDateInPast(7)));
        onDateChange({ fromDate: new Date(), toDate: getDateInPast(7) });
        break;
      case dateRanges.last30Days:
        setDateRangeText(getDateRangeText(new Date(), getDateInPast(30)));
        onDateChange({ fromDate: new Date(), toDate: getDateInPast(30) });
        break;
      case dateRanges.last90Days:
        setDateRangeText(getDateRangeText(new Date(), getDateInPast(90)));
        onDateChange({ fromDate: new Date(), toDate: getDateInPast(90) });
        break;
      case dateRanges.custom:
        setDateRangeText('Last 90 days');
        break;
    }
  }, [selectRangeText]);

  return (
    <div className="flex defaultText">
      <div className={classNames(pillClasses, 'rounded-l-full border-r-0')}>
        <div className="flex flex-col-2 space-x-2">
          <span>{selectRangeText}</span>
          <svg
            className="stroke-defaultText mt-2"
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
      <div className={classNames(pillClasses, 'rounded-r-full ')}>{dateRangeText}</div>
    </div>
  );
};

export default DateRangePicker;
