import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker';
import SearchBar from '../SearchBar/SearchBar';
import AmountFilter from '../AmountFilter/AmountFilter';
import TagFilter, { FilterableTag } from '../TagFilter/TagFilter';
import { SelectSorter, TSorterOptions } from '@/components/ui/molecules';
import { SortDirection } from '@/components/ui/ColumnHeader/ColumnHeader';

interface FilterControlsRowProps {
  setDateRange: (dateRange: DateRange) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  currency?: string;
  setCurrency?: (currency?: string) => void;
  minAmount?: number;
  setMinAmount?: (minAmount?: number) => void;
  maxAmount?: number;
  setMaxAmount?: (maxAmount?: number) => void;
  tags: FilterableTag[];
  setTags: (tags: FilterableTag[]) => void;
  createdSortDirection: SortDirection;
  setCreatedSortDirection?: (direction: SortDirection) => void;
  amountSortDirection: SortDirection;
  setAmountSortDirection?: (direction: SortDirection) => void;
}

const sortOptions = {
  created: {
    ASC: 'olderFirst',
    DESC: 'moreRecentFirst',
  },
  amount: {
    ASC: 'amountLowToHigh',
    DESC: 'amountHighToLow',
  },
};

const FilterControlsRow = ({
  setDateRange,
  searchFilter,
  setSearchFilter,
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  tags,
  setTags,
  createdSortDirection,
  setCreatedSortDirection,
  amountSortDirection,
  setAmountSortDirection,
}: FilterControlsRowProps) => {
  const onValueChanged = (value: TSorterOptions) => {
    switch (value) {
      case 'moreRecentFirst':
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.DESC);
        setAmountSortDirection && setAmountSortDirection(SortDirection.NONE);
        break;
      case 'olderFirst':
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.ASC);
        setAmountSortDirection && setAmountSortDirection(SortDirection.NONE);
        break;
      case 'amountHighToLow':
        setAmountSortDirection && setAmountSortDirection(SortDirection.DESC);
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.NONE);
        break;
      case 'amountLowToHigh':
        setAmountSortDirection && setAmountSortDirection(SortDirection.ASC);
        setCreatedSortDirection && setCreatedSortDirection(SortDirection.NONE);
        break;
    }
  };

  const getSorterValue = () => {
    if (createdSortDirection === SortDirection.DESC) {
      return 'moreRecentFirst';
    } else if (createdSortDirection === SortDirection.ASC) {
      return 'olderFirst';
    } else if (amountSortDirection === SortDirection.DESC) {
      return 'amountHighToLow';
    } else if (amountSortDirection === SortDirection.ASC) {
      return 'amountLowToHigh';
    } else {
      return 'moreRecentFirst';
    }
  };

  return (
    <div className="flex md:w-auto md:flex justify-between md:p-3 bg-white rounded-lg">
      <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>

      <div className="md:hidden">
        <SelectSorter className="text-right" value={getSorterValue()} onValueChange={onValueChanged} />
      </div>

      <div className="hidden md:inline-flex flex-row space-x-2">
        <SearchBar value={searchFilter} setValue={setSearchFilter} />

        <AmountFilter
          currency={currency}
          setCurrency={setCurrency}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
        />

        <TagFilter tags={tags} setTags={setTags} />
      </div>
    </div>
  );
};

export default FilterControlsRow;
