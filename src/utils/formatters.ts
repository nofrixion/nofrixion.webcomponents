import { add, formatDistanceToNowStrict, isEqual, isToday, isYesterday, startOfDay } from 'date-fns';
import { SortDirection } from '../components/ui/ColumnHeader/ColumnHeader';
import { dateRanges } from './constants';

// This function formats a date as a string, returning a human-readable
// representation of either "Today" or "Yesterday" if the date is within the
// last 48 hours, or a human-readable representation of the distance to the
// date otherwise.
//
// If the date is today, returns "Today"
// If the date is yesterday, returns "Yesterday"
// Otherwise, returns a human-readable representation of the distance to the
// date, such as "2 days ago"
const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  }

  return formatDistanceToNowStrict(date, { addSuffix: true });
};

// Formats the given amount into a currency string.
// For example:
// - 10.5 -> '10.50'
// - 10.55 -> '10.55'
// - 115949 -> '115,949.00'
// - 29 -> '29.00'
// - 32 -> '32.00'
// - 89.99 -> '89.99'
// - 123456789 -> '123,456,789.00'
// - 115.5 -> '115.50'
// - 699.9 -> '699.90'
const formatAmount = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};

/**
 * Formats the given sort direction into a string that can be used in the API
 * @param statusSortDirection The sort direction for the status column
 * @param createdSortDirection The sort direction for the created/inserted column
 * @param contactSortDirection The sort direction for the CustomerEmailAddress column
 * @param amountSortDirection The sort direction for the amount column
 * @returns An expression to sort the order of the payment requests. Example "Amount desc,Inserted asc".
 */
const formatPaymentRequestSortExpression = (
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  contactSortDirection: SortDirection,
  amountSortDirection: SortDirection,
): string => {
  let sortExpression = '';

  if (statusSortDirection !== SortDirection.NONE) {
    sortExpression += `Status ${statusSortDirection}`;
  }

  if (createdSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : '';
    sortExpression += `Inserted ${createdSortDirection}`;
  }

  if (contactSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : '';
    sortExpression += `CustomerEmailAddress ${contactSortDirection}`;
  }

  if (amountSortDirection !== SortDirection.NONE) {
    sortExpression += sortExpression.length > 0 ? ',' : '';
    sortExpression += `Amount ${amountSortDirection}`;
  }

  return sortExpression;
};

const getDateFormat = (date: Date): string => {
  const today = new Date();

  if (date.getFullYear() < today.getFullYear()) {
    return 'MMM do, y';
  }

  return 'MMM do';
};

const getSelectRangeText = (fromDate: Date, toDate: Date): string => {
  if (isToday(fromDate) && isToday(toDate)) {
    return dateRanges.today;
  } else if (isYesterday(fromDate) && isYesterday(toDate)) {
    return dateRanges.yesterday;
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -7 })))) {
    return dateRanges.last7Days;
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -30 })))) {
    return dateRanges.last30Days;
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -90 })))) {
    return dateRanges.last90Days;
  } else {
    return 'Custom';
  }
};

export { formatDate, formatAmount, formatPaymentRequestSortExpression, getDateFormat, getSelectRangeText };
