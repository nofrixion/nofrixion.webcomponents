import { type SelectProps } from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/atoms/Select/Select';
import { cn } from '@/utils';

const options = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7Days: 'Last 7 days',
  last30Days: 'Last 30 days',
  last90Days: 'Last 90 days',
};

type TDateRangeOptions = keyof typeof options;

interface SelectDateRangePros extends SelectProps {
  onValueChange?: (value: TDateRangeOptions) => void;
  defaultValue?: TDateRangeOptions;
  value?: TDateRangeOptions;
  subText?: string;
  className?: string;
}

const SelectDateRange: React.FC<SelectDateRangePros> = ({
  defaultValue,
  value,
  onValueChange,
  subText,
  className,
  ...props
}) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger subText={subText} className={cn('w-full md:w-[130px]', className)}>
        <SelectValue>{value != undefined ? options[value] : 'Custom'}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(options).map((key) => (
          <SelectItem key={key} value={key}>
            {options[key as keyof typeof options]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SelectDateRange, type TDateRangeOptions };
