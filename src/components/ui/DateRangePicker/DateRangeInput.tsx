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
      <ResizableComponent>
        <button className="pl-4" onClick={props.openCalendar}>
          {formattedDate}
        </button>
      </ResizableComponent>
    </div>
  );
};

export default DateRangeInput;
