import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker';
import SearchBar from '../SearchBar/SearchBar';

interface PaymentRequestFilterRowProps {
  setDateRange: (dateRange: DateRange) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

const PaymentRequestFilterRow = ({ setDateRange, searchFilter, setSearchFilter }: PaymentRequestFilterRowProps) => {
  return (
    <div className="flex justify-between p-3 bg-white rounded-lg">
      <div>
        <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
      </div>
      <div className="inline-flex flex-row space-x-2">
        <SearchBar value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)}></SearchBar>
      </div>
    </div>
  );
};

export default PaymentRequestFilterRow;
