import DateRangeIcon from './DateRangeIcon';

interface DateRangeInputProps {
  displayText: string;
}

const DateRangeInput = (props: any) => {
  console.log(props);
  return (
    <div className="flex">
      <DateRangeIcon />
      <button className="pl-1" onClick={props.openCalendar}>
        {props.value}
      </button>
    </div>
  );
};

export default DateRangeInput;
