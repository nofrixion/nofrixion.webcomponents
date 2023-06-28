import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker';
import SearchBar from '../SearchBar/SearchBar';
import PaymentRequestAmountFilter from '../PaymentRequestAmountFilter/PaymentRequestAmountFilter';

interface PaymentRequestFilterRowProps {
  setDateRange: (dateRange: DateRange) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  currency?: string;
  setCurrency?: (currency?: string) => void;
  minAmount?: number;
  setMinAmount?: (minAmount?: number) => void;
  maxAmount?: number;
  setMaxAmount?: (maxAmount?: number) => void;
}

const PaymentRequestFilterRow = ({
  setDateRange,
  searchFilter,
  setSearchFilter,
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
}: PaymentRequestFilterRowProps) => {
  return (
    <div className="flex justify-between p-3 bg-white rounded-lg">
      <div>
        <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
      </div>
      <div className="inline-flex flex-row space-x-2">
        <SearchBar value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />

        <PaymentRequestAmountFilter
          currency={currency}
          setCurrency={setCurrency}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
        />
      </div>
    </div>
  );
};

export default PaymentRequestFilterRow;
