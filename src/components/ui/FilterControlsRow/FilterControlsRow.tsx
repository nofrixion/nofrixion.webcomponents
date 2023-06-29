import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker';
import SearchBar from '../SearchBar/SearchBar';
import AmountFilter from '../AmountFilter/AmountFilter';
import TagFilter, { FilterableTag } from '../TagFilter/TagFilter';

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
}

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
}: FilterControlsRowProps) => {
  return (
    <div className="flex justify-between p-3 bg-white rounded-lg">
      <div>
        <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
      </div>
      <div className="inline-flex flex-row space-x-2">
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
