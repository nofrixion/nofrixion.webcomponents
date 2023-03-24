import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { dateRanges } from '../../../utils/constants';
import { getDateFormat, getDateInPast } from '../../../utils/formatters';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { DateRangePicker as DateRange } from 'rsuite';
import '../../../rsuite.css';
import { format } from 'date-fns';
import isAfter from 'date-fns/isAfter';

const { afterToday } = DateRange;

const pillClasses = 'bg-[#EDF2F7] text-sm whitespace-nowrap border-[1px] border-[#D5DBDD] cursor-pointer';

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
  const [selectRangeText, setSelectRangeText] = useState(rangeText);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    onDateChange && onDateChange({ fromDate: fromDate, toDate: toDate });
  }, [fromDate, toDate]);

  useEffect(() => {
    setSelectRangeText(rangeText);
  }, [rangeText]);

  useEffect(() => {
    let fromDate = new Date();

    switch (selectRangeText) {
      case dateRanges.today:
        setFromDate(getDateInPast(0, true));
        setToDate(new Date());
        break;
      case dateRanges.yesterday:
        fromDate = getDateInPast(1, true);
        setFromDate(fromDate);
        setToDate(getDateInPast(1, false));
        break;
      case dateRanges.last7Days:
        fromDate = getDateInPast(7, true);
        setFromDate(fromDate);
        setToDate(new Date());
        break;
      case dateRanges.last30Days:
        fromDate = getDateInPast(30, true);
        setFromDate(fromDate);
        setToDate(new Date());
        break;
      case dateRanges.last90Days:
        fromDate = getDateInPast(90, true);
        setFromDate(fromDate);
        setToDate(new Date());
        break;
    }
  }, [selectRangeText]);

  return (
    <div className="flex defaultText">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div
            className={classNames(
              pillClasses,
              'text-[#00264D] rounded-l-full border-r-0 flex flex-col-2 space-x-2 pl-4 pr-3',
            )}
          >
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

      <div className={classNames(pillClasses, 'rounded-r-full flex flex-col-2 pr-2')}>
        <DateRange
          showOneCalendar
          disabledDate={afterToday && afterToday()}
          cleanable={false}
          appearance="subtle"
          character=" - "
          editable={false}
          format="MMM do, y"
          value={[fromDate, toDate]}
          size="md"
          ranges={[]}
          renderValue={(value) => {
            if (selectRangeText === dateRanges.today || selectRangeText === dateRanges.yesterday) {
              return format(value[0], 'MMM do');
            }
            const dateFormat = getDateFormat(value[0], value[1]);
            return format(value[0], dateFormat) + ' - ' + format(value[1], dateFormat);
          }}
          onOk={(item) => {
            if (item !== null) {
              setFromDate(item[0]);
              setToDate(item[1]);
              setSelectRangeText('Custom');
            }
          }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
