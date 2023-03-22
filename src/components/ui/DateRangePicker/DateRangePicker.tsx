import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { dateRanges } from '../../../utils/constants';

interface DateRangeFilterProps {
  rangeText: string;
}

const DateRangePicker = ({ rangeText }: DateRangeFilterProps) => {
  const [selectRangeText, setSelectRangeText] = useState(rangeText);
  const [dateRangeText, setDateRangeText] = useState('');

  const pillClasses = 'bg-[#EDF2F7] px-3 py-1.5 text-sm leading-6 whitespace-nowrap border-[1px] border-[#D5DBDD]';

  const formatDateRangeText = (toDate: Date, fromDate: Date): string => {
    if (toDate.getFullYear() !== fromDate.getFullYear()) {
      return 'MMM do, y';
    }

    return 'MMM do';
  };

  const getDateRangeText = (toDate: Date, fromDate: Date): string => {
    return `${format(toDate, formatDateRangeText(toDate, fromDate))} - ${format(
      fromDate,
      formatDateRangeText(toDate, fromDate),
    )}`;
  };

  useEffect(() => {
    setSelectRangeText(rangeText);
  }, [rangeText]);

  useEffect(() => {
    let date = new Date();

    switch (selectRangeText) {
      case dateRanges.today:
        setDateRangeText(format(new Date(), 'MMM do'));
        break;
      case dateRanges.yesterday:
        date.setDate(date.getDate() - 1);

        setDateRangeText(format(date, 'MMM do'));

        break;
      case dateRanges.last7Days:
        date.setDate(date.getDate() - 7);

        setDateRangeText(getDateRangeText(new Date(), date));

        break;
      case dateRanges.last30Days:
        date.setDate(date.getDate() - 30);

        setDateRangeText(getDateRangeText(new Date(), date));
        break;
      case dateRanges.last90Days:
        date.setDate(date.getDate() - 90);

        setDateRangeText(getDateRangeText(new Date(), date));
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
