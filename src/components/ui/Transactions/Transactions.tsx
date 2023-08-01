import { LocalCardPaymentResponseStatus, LocalPaymentMethodTypes, SubTransactionType } from '../../../types/LocalEnums';
import CardIcon from '../../../assets/icons/card-icon.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import TickBadgeIcon from '../../../assets/icons/tick-badge-icon.svg';
import ReturnIcon from '../../../assets/icons/return-icon.svg';
import { format } from 'date-fns';
import classNames from 'classnames';
import { LocalPaymentAttempt } from '../../../types/LocalTypes';
import { Currency } from '@nofrixion/moneymoov';
import React from 'react';
import {
  getSubTransactions,
  hasRefundOrCaptureAttempts,
  isCaptureable,
  isRefundable,
} from '../../../utils/paymentAttemptsHelper';

export interface TransactionsProps {
  transactions: LocalPaymentAttempt[];
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void;
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void;
}

const PaymentMethodIcon = ({ paymentMethod }: { paymentMethod: LocalPaymentMethodTypes }) => {
  switch (paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return <img src={CardIcon} alt="card" />;
    case LocalPaymentMethodTypes.Pisp:
      return <img src={BankIcon} alt="bank" />;
    case LocalPaymentMethodTypes.ApplePay:
    case LocalPaymentMethodTypes.GooglePay:
      return <img src={WalletIcon} alt="wallet" />;
    default:
      return null;
  }
};

const Transactions = ({ transactions, onRefund, onCapture }: TransactionsProps) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-default-text text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr
                  className={classNames('group whitespace-nowrap', {
                    'border-b': !hasRefundOrCaptureAttempts(transaction),
                  })}
                >
                  <td className={classNames('text-[0.813rem] pb-2 leading-6', { 'pt-2': index !== 0 })}>
                    {/* Mobile date */}
                    <span className="inline lg:hidden">
                      {transaction.occurredAt && format(transaction.occurredAt, 'dd/MM/yyyy')}
                    </span>

                    {/* Desktop date */}
                    <span className="hidden lg:inline">
                      {transaction.occurredAt && format(transaction.occurredAt, 'MMM do, yyyy')}
                    </span>
                  </td>
                  <td className={classNames('pl-2 lg:pl-6 pb-2 text-right', { 'pt-2': index !== 0 })}>
                    <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
                      <span className="lg:hidden">{transaction.currency === Currency.EUR ? '€' : '£'}</span>
                      {new Intl.NumberFormat(navigator.language, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(Number(transaction.amount))}
                    </span>
                  </td>
                  <td className={classNames('hidden lg:table-cell pb-2', { 'pt-2': index !== 0 })}>
                    <span className="text-greyText font-normal text-[0.813rem] leading-6">{transaction.currency}</span>
                  </td>
                  <td className={classNames('pl-2 lg:pl-6 pb-2', { 'pt-2': index !== 0 })}>
                    <div className="flex flex-row items-center">
                      <span className="mr-2 w-4 h-4">
                        <PaymentMethodIcon paymentMethod={transaction.paymentMethod}></PaymentMethodIcon>
                      </span>
                      <span className="hidden lg:inline text-sm leading-6">{transaction.processor}</span>
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        transaction.last4DigitsOfCardNumber && (
                          <div className="hidden lg:flex text-sm ml-1 items-center">
                            <span className="text-[0.375rem] mr-1">&#8226;&#8226;&#8226;&#8226;</span>
                            <span>{transaction.last4DigitsOfCardNumber}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td
                    className={classNames('pl-2 pb-2 lg:pl-6 leading-6', {
                      'pt-2': index !== 0,
                    })}
                  >
                    <div className="flex justify-end">
                      {isCaptureable(transaction) && (
                        <button
                          type="button"
                          className="text-white text-13px leading-4 bg-primaryGreen hover:bg-primaryGreenHover rounded-full px-2 py-1 transition-colors"
                          onClick={() => onCapture(transaction)}
                        >
                          Capture
                        </button>
                      )}
                      {transaction.status === 'authorized' && (
                        <span className="text-greyText text-[10px] leading-4 block px-1 border rounded border-solid border-borderGreyHighlighted">
                          Authorized
                        </span>
                      )}
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card && isRefundable(transaction) && (
                        <button
                          className="rounded-full w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg fill-[#8F99A3] hover:fill-[#454D54] data-[state='open']:fill-[#454D54]"
                          aria-label="Actions"
                          onClick={() => onRefund(transaction)}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" className="w-4 h-4" version="1.1">
                            <circle cx="7.5" cy="1.5" r="1.5" className="currentColor" id="circle2" />
                            <circle cx="7.5" cy="7.5" r="1.5" className="currentColor" id="circle4" />
                            <circle cx="7.5" cy="13.5" r="1.5" className="currentColor" id="circle6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {getSubTransactions(transaction).map((subTransaction, evIndex) => (
                  <tr
                    key={`ev_${evIndex}`}
                    className={classNames('text-xs leading-6 group whitespace-nowrap', {
                      'border-b [&>td]:pb-2': evIndex === getSubTransactions(transaction).length - 1,
                    })}
                  >
                    <td className="py-0">
                      {/* Mobile date */}
                      <span className="inline lg:hidden">
                        {subTransaction.occurredAt && format(subTransaction.occurredAt, 'dd/MM/yyyy')}
                      </span>

                      {/* Desktop date */}
                      <span className="hidden lg:inline">
                        {subTransaction.occurredAt && format(subTransaction.occurredAt, 'MMM do, yyyy')}
                      </span>
                    </td>
                    <td className="pl-2 lg:pl-6 text-right py-0">
                      <span
                        className={classNames('mr-2 font-medium tabular-nums ', {
                          'text-[#29A37A]': subTransaction.type === SubTransactionType.Capture,
                        })}
                      >
                        <span className="lg:hidden">{subTransaction.currency === Currency.EUR ? '€' : '£'}</span>
                        {subTransaction.type === SubTransactionType.Refund && <span>-</span>}
                        {formatter.format(subTransaction.amount)}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell py-0">
                      <span className="text-greyText font-normal">{subTransaction.currency}</span>
                    </td>
                    {subTransaction.type === SubTransactionType.Capture && (
                      <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                        <div className="flex flex-row items-center">
                          <span className="mr-2 p-1.5">
                            <img src={TickBadgeIcon} className="h-3 w-3" alt="Captured" title="Captured" />
                          </span>
                          <span>Captured</span>
                        </div>
                      </td>
                    )}
                    {subTransaction.type === SubTransactionType.Refund && (
                      <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                        <div className="flex flex-row items-center">
                          <span className="mr-2 p-1.5">
                            <img src={ReturnIcon} className="h-3 w-3" alt="Refund" title="Refund" />
                          </span>
                          <span>Refund</span>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Transactions;
