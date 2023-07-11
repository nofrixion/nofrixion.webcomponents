import { LocalCardPaymentResponseStatus, LocalPaymentMethodTypes } from '../../../types/LocalEnums';
import CardIcon from '../../../assets/icons/card-icon.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import TickBadgeIcon from '../../../assets/icons/tick-badge-icon.svg';
import { format } from 'date-fns';
import classNames from 'classnames';
import { LocalPaymentAttempt, LocalPaymentRequestEvent } from '../../../types/LocalTypes';
import { PaymentRequestEventType } from '@nofrixion/moneymoov';
import React from 'react';

export interface TransactionsProps {
  transactions: LocalPaymentAttempt[];
  onRefund: (paymentAttemptID: string) => void;
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

  const getShowableEvents = (events: LocalPaymentRequestEvent[]) => {
    return events.filter((event) => isCaptureEvent(event));
  };

  const isCaptureEvent = (event: LocalPaymentRequestEvent) => {
    return (
      event.type === PaymentRequestEventType.card_capture &&
      (event.status === LocalCardPaymentResponseStatus.CardCheckoutCaptured ||
        event.status === LocalCardPaymentResponseStatus.CardCaptureSuccess)
    );
  };

  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-defaultText text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr
                  className={classNames('group whitespace-nowrap', {
                    'border-b': getShowableEvents(transaction.events).length === 0,
                  })}
                >
                  <td className={classNames('text-[0.813rem] pb-2 leading-6', { 'pt-2': index !== 0 })}>
                    {transaction.occurredAt && format(transaction.occurredAt, 'MMM do, yyyy')}
                  </td>
                  <td className={classNames('pl-6 pb-2 text-right', { 'pt-2': index !== 0 })}>
                    <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
                      {formatter.format(Number(transaction.amount))}
                    </span>
                  </td>
                  <td className={classNames('pb-2', { 'pt-2': index !== 0 })}>
                    <span className="text-greyText font-normal text-[0.813rem] leading-6">{transaction.currency}</span>
                  </td>
                  <td className={classNames('pl-6 pb-2', { 'pt-2': index !== 0 })}>
                    <div className="flex flex-row items-center">
                      <span className="mr-2">
                        <PaymentMethodIcon paymentMethod={transaction.paymentMethod}></PaymentMethodIcon>
                      </span>
                      <span className="text-sm leading-6">{transaction.processor}</span>
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        transaction.last4DigitsOfCardNumber && (
                          <div className="text-sm ml-1 items-center flex">
                            <span className="text-[0.375rem] mr-1">&#8226;&#8226;&#8226;&#8226;</span>
                            <span>{transaction.last4DigitsOfCardNumber}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td
                    className={classNames('pl-6 pb-2 leading-6', {
                      'pt-2': index !== 0,
                    })}
                  >
                    <div className="flex justify-end">
                      {/* 
                    Commeting out refund button for now
                    until we have that functionality in the API
                  */}
                      {/*
                  <div className="w-[3.75rem] text-[0.813rem] h-6 ">
                    <div
                      className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:bg-[#BDCCDB]"
                      onClick={() => onRefundClicked(transaction.attemptKey)}
                    >
                      Refund
                    </div> 
                  </div>
                  */}
                      {transaction.needsCapture && (
                        <button
                          type="button"
                          className="text-white text-13px leading-4 bg-primaryGreen hover:bg-primaryGreenHover rounded-full px-2 py-1 transition-colors"
                          onClick={() => onCapture(transaction)}
                        >
                          Capture
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {getShowableEvents(transaction.events).map((event, evIndex) => (
                  <tr
                    key={`ev_${evIndex}`}
                    className={classNames('text-xs leading-6 group whitespace-nowrap', {
                      'border-b [&>td]:pb-2': evIndex === getShowableEvents(transaction.events).length - 1,
                    })}
                  >
                    <td className="py-0">{format(event.occurredAt, 'MMM do, yyyy')}</td>
                    <td className="pl-6 text-right py-0">
                      <span
                        className={classNames('mr-2 font-medium tabular-nums', {
                          'text-[#29A37A]': isCaptureEvent(event),
                        })}
                      >
                        {formatter.format(Number(event.amount))}
                      </span>
                    </td>
                    <td className="py-0">
                      <span className="text-greyText font-normal">{transaction.currency}</span>
                    </td>
                    <td className="pl-6 py-0">
                      {isCaptureEvent(event) && (
                        <div className="flex flex-row items-center">
                          <span className="mr-2 p-1.5">
                            <img src={TickBadgeIcon} className="h-3 w-3" alt="Captured" title="Captured" />
                          </span>
                          <span>Captured</span>
                        </div>
                      )}
                    </td>
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
