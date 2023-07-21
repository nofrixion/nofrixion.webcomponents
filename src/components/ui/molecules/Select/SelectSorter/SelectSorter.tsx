import { type SelectProps } from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/atoms/Select/Select';
import { cn } from '@/utils';

const options = {
  moreRecentFirst: 'More recent first',
  olderFirst: 'Older first',
  amountHighToLow: 'More expensive first',
  amountLowToHigh: 'Cheaper first',
};

const displayValue = {
  moreRecentFirst: 'Creation date',
  olderFirst: 'Creation date',
  amountHighToLow: 'Amount',
  amountLowToHigh: 'Amount',
};

type TSorterOptions = keyof typeof options;

interface SelectSorterProps extends SelectProps {
  onValueChange?: (value: TSorterOptions) => void;
  defaultValue?: TSorterOptions;
  value?: TSorterOptions;
  className?: string;
}

const SelectSorter: React.FC<SelectSorterProps> = ({ defaultValue, value, onValueChange, className, ...props }) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger subText={value ? options[value] : undefined} className={cn('w-full', className)}>
        <SelectValue>{value != undefined ? displayValue[value] : '-'}</SelectValue>
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

export { SelectSorter, type TSorterOptions };
