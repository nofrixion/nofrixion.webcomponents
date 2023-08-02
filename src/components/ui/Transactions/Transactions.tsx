import { LocalPaymentMethodTypes, LocalWallets, SubTransactionType } from '../../../types/LocalEnums';
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
import { Icon } from '../atoms';

export interface TransactionsProps {
  transactions: LocalPaymentAttempt[];
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void;
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void;
}

const PaymentMethodIcon = ({
  paymentMethod,
  wallet,
}: {
  paymentMethod: LocalPaymentMethodTypes;
  wallet: LocalWallets | undefined;
}) => {
  switch (paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      switch (wallet) {
        case LocalWallets.ApplePay:
        case LocalWallets.GooglePay:
          return <Icon name="wallets/24" className="text-[#454D54]" />;
        default:
          return <Icon name="card/24" className="text-[#454D54]" />;
      }
    case LocalPaymentMethodTypes.Pisp:
      return <Icon name="bank/24" className="text-[#454D54]" />;
    case LocalPaymentMethodTypes.ApplePay:
    case LocalPaymentMethodTypes.GooglePay:
      return <Icon name="wallets/24" />;
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
                      <span className="mr-2">
                        <PaymentMethodIcon
                          paymentMethod={transaction.paymentMethod}
                          wallet={transaction.wallet}
                        ></PaymentMethodIcon>
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
                          className="rounded-full w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg text-[#8F99A3] hover:text-[#454D54] data-[state='open']:text-[#454D54]"
                          aria-label="Actions"
                          onClick={() => onRefund(transaction)}
                        >
                          <Icon name="ellipsis/24" />
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
                        <div className="flex flex-row items-center ml-1">
                          <span className="mr-2 p-1.5">
                            <Icon name="capture/12" className="text-[#454D54]" />
                          </span>
                          <span>Captured</span>
                        </div>
                      </td>
                    )}
                    {subTransaction.type === SubTransactionType.Refund && (
                      <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                        <div className="flex flex-row items-center ml-[0.125]">
                          <span className="mr-2 p-1.5">
                            <Icon name="return/16" className="text-[#454D54]" />
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
