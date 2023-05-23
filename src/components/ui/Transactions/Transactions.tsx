import { Currency } from '../../../api/types/Enums';
import { PaymentMethod } from '../../../types/LocalEnums';
import CardIcon from '../../../assets/icons/card-icon.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import { format } from 'date-fns';

export interface Transaction {
  paymentAttemptID: string;
  occurredAt: Date;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: Currency.EUR | Currency.GBP;
  processor: string;
  last4DigitsOfCardNumber?: string;
}

const PaymentMethodIcon = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
  switch (paymentMethod) {
    case PaymentMethod.Card:
      return <img src={CardIcon} alt="card" />;
    case PaymentMethod.Pisp:
      return <img src={BankIcon} alt="bank" />;
    case PaymentMethod.ApplePay:
    case PaymentMethod.GooglePay:
      return <img src={WalletIcon} alt="wallet" />;
    default:
      return null;
  }
};

const Transactions = ({
  transactions,
  onRefundClicked,
}: {
  transactions: Transaction[];
  onRefundClicked: (paymentAttemptID: string) => void;
}) => {
  return (
    <table>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="border-b group">
            <td className="text-[0.813rem] pb-2 pt-2 leading-6">{format(transaction.occurredAt, 'MMM do, yyyy')}</td>
            <td className="pl-6 pb-2 pt-2 text-right">
              <span className="mr-2 text-sm tabular-nums font-medium leading-6">
                {new Intl.NumberFormat(navigator.language).format(Number(transaction.amount.toFixed(2)))}
              </span>
            </td>
            <td>
              <span className="text-greyText font-normal text-[0.813rem] leading-6">{transaction.currency}</span>
            </td>
            <td className="pl-6 pb-2 pt-2 ">
              <div className="flex flex-row items-center">
                <span className="mr-2">
                  <PaymentMethodIcon paymentMethod={transaction.paymentMethod}></PaymentMethodIcon>
                </span>
                <span className="text-sm leading-6">{transaction.processor}</span>
                {transaction.paymentMethod === PaymentMethod.Card && transaction.last4DigitsOfCardNumber && (
                  <div className="text-sm ml-1 items-center flex">
                    <span className="text-[0.375rem] mr-1">&#8226;&#8226;&#8226;&#8226;</span>
                    <span>{transaction.last4DigitsOfCardNumber}</span>
                  </div>
                )}
              </div>
            </td>
            <td className="pl-6 pb-2 pt-2 leading-6">
              <div className="w-[3.75rem] text-[0.813rem] h-6 ">
                <div
                  className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:bg-[#BDCCDB]"
                  onClick={() => onRefundClicked(transaction.paymentAttemptID)}
                >
                  Refund
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Transactions;
