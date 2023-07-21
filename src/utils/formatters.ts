import { add, formatDistanceToNowStrict, isEqual, isToday, isYesterday, startOfDay } from 'date-fns';
import { SortDirection } from '../components/ui/ColumnHeader/ColumnHeader';
import type { TDateRangeOptions } from '@/components/ui/molecules';

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
const formatAmount = (amount: number, fractionDigits = 2): string => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);

  return formattedAmount;
};

const formatAmountAndDecimals = (amount: number) => {
  // Get the amount and split it into the value and the decimals
  const parsedAmount = amount.toString().split('.');

  // Divide amount into thousands with ","
  const amountValueWithCommas = parsedAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let amountDecimals = parsedAmount[1];

  if (amountDecimals && amountDecimals.length == 1) {
    amountDecimals += '0';
  }

  return {
    amountValueWithCommas,
    amountDecimals: amountDecimals ?? '00',
  };
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

const getSelectRangeText = (fromDate: Date, toDate: Date): TDateRangeOptions | undefined => {
  if (isToday(fromDate) && isToday(toDate)) {
    return 'today';
  } else if (isYesterday(fromDate) && isYesterday(toDate)) {
    return 'yesterday';
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -7 })))) {
    return 'last7Days';
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -30 })))) {
    return 'last30Days';
  } else if (isToday(toDate) && isEqual(fromDate, startOfDay(add(new Date(), { days: -90 })))) {
    return 'last90Days';
  } else {
    return undefined;
  }
};

export {
  formatDate,
  formatAmount,
  formatAmountAndDecimals,
  formatPaymentRequestSortExpression,
  getDateFormat,
  getSelectRangeText,
};
