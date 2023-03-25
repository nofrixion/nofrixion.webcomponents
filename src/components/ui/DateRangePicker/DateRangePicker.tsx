import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { dateRanges } from '../../../utils/constants';
import { getDateInPast } from '../../../utils/formatters';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import DateRangeInput from './DateRangeInput';

const pillClasses =
  'text-defaultText hover:text-greyText bg-[#EDF2F7] text-sm whitespace-nowrap border-[1px] border-[#D5DBDD] cursor-pointer';

const actionItemClassNames =
  'group text-xs leading-none rounded-1 flex items-center relative select-none outline-none cursor-pointer py-2';

const actionItem = cva(actionItemClassNames, {
  variants: {
    intent: {
      neutral: ['data-[highlighted]:text-[#00264D]'],
      selected: ['text-highlightedGreenText data-[highlighted]:cursor-default'],
    },
  },
  defaultVariants: {
    intent: 'neutral',
  },
});

export type DateRange = {
  fromDate: Date;
  toDate: Date;
};

interface DateRangeFilterProps {
  rangeText: string;
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ rangeText = dateRanges.last90Days, onDateChange }: DateRangeFilterProps) => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [selectRangeText, setSelectRangeText] = useState(rangeText);

  useEffect(() => {
    if (dates.length === 2) {
      onDateChange && onDateChange({ fromDate: new Date(dates[0].toDate()), toDate: new Date(dates[1].toDate()) });
    }
  }, [dates]);

  useEffect(() => {
    setSelectRangeText(rangeText);
  }, [rangeText]);

  useEffect(() => {
    let fromDate = new Date();

    switch (selectRangeText) {
      case dateRanges.today:
        setDates([new DateObject(getDateInPast(0, true)), new DateObject(new Date())]);
        break;
      case dateRanges.yesterday:
        fromDate = getDateInPast(1, true);
        setDates([new DateObject(fromDate), new DateObject(getDateInPast(1, false))]);
        break;
      case dateRanges.last7Days:
        fromDate = getDateInPast(7, true);
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      case dateRanges.last30Days:
        fromDate = getDateInPast(30, true);
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      case dateRanges.last90Days:
        fromDate = getDateInPast(90, true);
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
    }
  }, [selectRangeText]);

  return (
    <div className="flex defaultText">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className={classNames(pillClasses, 'rounded-l-full border-r-0 flex flex-col-2 space-x-2 pl-4 pr-3')}>
            <div className="py-2">
              <span>{selectRangeText}</span>
            </div>

            <div className="py-4">
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
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content asChild forceMount sideOffset={5}>
            <motion.div
              className="min-w-[150px] bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] space-y-2 p-4"
              initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
              animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
            >
              {Object.values(dateRanges).map((daterange) => {
                return (
                  <DropdownMenu.Item
                    className={actionItem({ intent: selectRangeText === daterange ? 'selected' : 'neutral' })}
                    onClick={() => setSelectRangeText(daterange)}
                  >
                    <span>{daterange}</span>
                  </DropdownMenu.Item>
                );
              })}
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className={classNames(pillClasses, 'rounded-r-full flex py-2 pr-4')}>
        <DatePicker
          value={dates}
          onChange={(changes: DateObject[]) => {
            setDates(changes);
            setSelectRangeText('Custom');
          }}
          range
          rangeHover
          maxDate={new Date()}
          render={<DateRangeInput />}
          className="green"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
