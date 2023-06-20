import { LocalPaymentMethodTypes } from '../../../types/LocalEnums';
import CardIcon from '../../../assets/icons/card-icon.svg';
import CardIconGrey from '../../../assets/icons/card-icon-grey.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import BankIconGrey from '../../../assets/icons/bank-icon-grey.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import WalletIconGrey from '../../../assets/icons/wallet-icon-grey.svg';
import { format } from 'date-fns';
import classNames from 'classnames';
import { LocalPaymentAttempt } from '../../../types/LocalTypes';

const PaymentMethodIcon = ({ paymentMethod, grey }: { paymentMethod: LocalPaymentMethodTypes; grey: boolean }) => {
  switch (paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      return grey ? <img src={CardIconGrey} alt="card" /> : <img src={CardIcon} alt="card" />;
    case LocalPaymentMethodTypes.Pisp:
      return grey ? <img src={BankIconGrey} alt="bank" /> : <img src={BankIcon} alt="bank" />;
    case LocalPaymentMethodTypes.ApplePay:
    case LocalPaymentMethodTypes.GooglePay:
      return grey ? <img src={WalletIconGrey} alt="wallet" /> : <img src={WalletIcon} alt="wallet" />;
    default:
      return null;
  }
};

const Transactions = ({
  transactions,
  onRefundClicked,
}: {
  transactions: LocalPaymentAttempt[];
  onRefundClicked: (paymentAttempt: LocalPaymentAttempt) => void;
}) => {
  console.log('transactions', transactions);
  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-defaultText text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className={classNames('border-b group whitespace-nowrap', {
                  'text-[#73808C]': transaction.refundedAt !== undefined,
                })}
              >
                <td className={classNames('text-[0.813rem] pb-2 leading-6', { 'pt-2': index !== 0 })}>
                  {transaction.occurredAt && format(transaction.occurredAt, 'MMM do, yyyy')}
                </td>
                <td className={classNames('pl-6 pb-2 text-right', { 'pt-2': index !== 0 })}>
                  <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
                    {new Intl.NumberFormat(navigator.language, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(Number(transaction.amount))}
                  </span>
                </td>
                <td className={classNames('pb-2', { 'pt-2': index !== 0 })}>
                  <span className="text-greyText font-normal text-[0.813rem] leading-6">{transaction.currency}</span>
                </td>
                <td className={classNames('pl-6 pb-2', { 'pt-2': index !== 0 })}>
                  <div className="flex flex-row items-center">
                    <span className="mr-2">
                      <PaymentMethodIcon
                        paymentMethod={transaction.paymentMethod}
                        grey={transaction.refundedAt !== undefined}
                      ></PaymentMethodIcon>
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
                    <div className="text-[0.813rem] h-6 ">
                      {!transaction.refundedAt && (
                        // <div
                        //   className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:bg-[#BDCCDB]"
                        //   onClick={() => onRefundClicked(transaction)}
                        // >
                        //   Refund
                        // </div>

                        <button
                          className="rounded-full w-6 h-6 p-1 inline-flex items-center justify-center outline-none cursor-pointer align-middle hover:bg-greyBg fill-[#8F99A3] hover:fill-[#454D54] data-[state='open']:fill-[#454D54]"
                          aria-label="Actions"
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" className="w-4 h-4" version="1.1">
                            <circle cx="7.5" cy="1.5" r="1.5" className="currentColor" id="circle2" />
                            <circle cx="7.5" cy="7.5" r="1.5" className="currentColor" id="circle4" />
                            <circle cx="7.5" cy="13.5" r="1.5" className="currentColor" id="circle6" />
                          </svg>
                        </button>
                      )}

                      {transaction.refundedAt && (
                        <div className="text-[0.813rem] px-2 py-1 rounded bg-white leading-4 cursor-pointer-none border border-solid border-[#ABB3BA] text-[#73808C]">
                          Refunded
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Transactions;
