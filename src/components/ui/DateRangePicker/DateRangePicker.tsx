import classNames from 'classnames';
import { MouseEventHandler, useEffect, useState } from 'react';
import { dateRanges } from '../../../utils/constants';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, MotionConfig } from 'framer-motion';
import { cva } from 'class-variance-authority';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import DateRangeInput from './DateRangeInput';
import './DateRangePicker.css';
import { add, startOfDay, endOfDay, isToday, isYesterday } from 'date-fns';
import { getSelectRangeText } from '../../../utils/formatters';
import DateRangeButton from './DateRangeButton';
import useMeasure from 'react-use-measure';

const pillClasses =
  'text-defaultText leading-6 hover:text-greyText bg-transparent text-sm whitespace-nowrap cursor-pointer select-none stroke-defaultText hover:stroke-controlGrey';

const actionItemClassNames =
  'group text-sm leading-6 rounded-1 flex items-center relative select-none outline-none cursor-pointer';

const actionItem = cva(actionItemClassNames, {
  variants: {
    intent: {
      neutral: ['data-[highlighted]:text-greyText'],
      selected: ['text-[#009999] data-[highlighted]:cursor-default'],
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
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ onDateChange }: DateRangeFilterProps) => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [selectRangeText, setSelectRangeText] = useState(dateRanges.last90Days);
  const [isClosed, setIsClosed] = useState(true);
  let [ref, { width }] = useMeasure();

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const onDateChangeHandler = () => {
    if (dates.length === 2 && isClosed) {
      setSelectRangeText(getSelectRangeText(dates[0].toDate(), dates[1].toDate()));
      onDateChange &&
        onDateChange({ fromDate: new Date(dates[0].toDate()), toDate: endOfDay(new Date(dates[1].toDate())) });
    }
  };

  useEffect(() => {
    onDateChangeHandler();
  }, [dates]);

  useEffect(() => {
    onDateChangeHandler();
  }, [isClosed]);

  useEffect(() => {
    let fromDate = new Date();
    let toDate = new Date();

    switch (selectRangeText) {
      case dateRanges.today:
        fromDate = startOfDay(new Date());
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      case dateRanges.yesterday:
        fromDate = startOfDay(add(new Date(), { days: -1 }));
        toDate = endOfDay(add(new Date(), { days: -1 }));
        setDates([new DateObject(fromDate), new DateObject(toDate)]);
        break;
      case dateRanges.last7Days:
        fromDate = startOfDay(add(new Date(), { days: -7 }));
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      case dateRanges.last30Days:
        fromDate = startOfDay(add(new Date(), { days: -30 }));
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      case dateRanges.last90Days:
        fromDate = startOfDay(add(new Date(), { days: -90 }));
        setDates([new DateObject(fromDate), new DateObject(new Date())]);
        break;
      default:
        break;
    }
  }, [selectRangeText]);

  return (
    <motion.div animate={{ width: width }} className="overflow-hidden border border-[#D5DBDD] rounded-3xl">
      <motion.div key={selectRangeText} animate={{ opacity: 1 }} initial={{ opacity: 0.5 }}>
        <div ref={ref} className="flex defaultText w-fit">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div
                className={classNames(
                  pillClasses,
                  'border-inherit border-r flex items-center w-fit space-x-2 pl-4 pr-3',
                )}
              >
                <span className="py-2">{selectRangeText}</span>

                <svg width="10" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.25L5 5.25L9 1.25" strokeLinecap="square" />
                </svg>
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content asChild forceMount sideOffset={5} className="px-6">
                <motion.div
                  className="min-w-[150px] bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] p-4 space-y-4"
                  initial={{ opacity: 0.5, y: -5, scaleX: 1, scaleY: 1 }}
                  animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
                >
                  {Object.values(dateRanges).map((daterange) => {
                    return (
                      <DropdownMenu.Item
                        key={daterange}
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

          <div className={classNames(pillClasses, 'flex py-2 pr-4')}>
            <DatePicker
              value={dates}
              onChange={(changes: DateObject[]) => {
                setDates(changes);
              }}
              onOpen={() => {
                setIsClosed(false);
              }}
              onClose={() => {
                setIsClosed(true);
                return true;
              }}
              range
              rangeHover
              maxDate={new Date()}
              render={(value: string[], openCalendar: () => void) => {
                return <DateRangeInput value={value} openCalendar={openCalendar} />;
              }}
              className="green"
              arrow={false}
              weekDays={weekDays}
              offsetY={13}
              renderButton={(
                direction: string,
                handleClick: MouseEventHandler<HTMLButtonElement> | undefined,
                disabled: boolean,
              ) => {
                return <DateRangeButton direction={direction} handleClick={handleClick} disabled={disabled} />;
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DateRangePicker;
