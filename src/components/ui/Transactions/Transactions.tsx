import { LocalPaymentMethodTypes } from '../../../types/LocalEnums';
import CardIcon from '../../../assets/icons/card-icon.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import { format } from 'date-fns';
import classNames from 'classnames';
import { LocalPaymentAttempt } from '../../../types/LocalTypes';

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

const Transactions = ({
  transactions,
  onRefundClicked,
}: {
  transactions: LocalPaymentAttempt[];
  onRefundClicked: (paymentAttemptID: string) => void;
}) => {
  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-defaultText text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b group whitespace-nowrap">
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
                  {/* 
                    Commeting out refund button for now
                    until we have that functionality in the API
                   */}
                  {/* <div className="flex justify-end">
                    <div className="w-[3.75rem] text-[0.813rem] h-6 ">
                      <div
                        className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:bg-[#BDCCDB]"
                        onClick={() => onRefundClicked(transaction.attemptKey)}
                      >
                        Refund
                      </div>
                    </div>
                  </div> */}
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
