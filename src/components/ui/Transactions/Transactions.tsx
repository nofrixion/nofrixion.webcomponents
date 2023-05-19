import { Currency } from '../../../api/types/Enums';
import { PaymentMethod } from '../../../types/PaymentMethodsEnum';
import CardIcon from '../../../assets/icons/card-icon.svg';
import BankIcon from '../../../assets/icons/bank-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface Transaction {
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

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleString('en-US', options);

  const day = new Date(date).getDate();
  const daySuffix = getDaySuffix(day);

  return `${formattedDate}${daySuffix}, ${new Date(date).getFullYear()}`;
};

const getDaySuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="px-4 pb-4 ">
      <table>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className="mb-2 border-b"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="text-[0.813rem] pb-2 pt-6">{formatDate(transaction.occurredAt)}</td>
              <td className="pl-6 pb-2 pt-6">
                <span className="mr-2 text-sm tabular-nums font-medium">
                  {new Intl.NumberFormat(navigator.language).format(transaction.amount)}
                </span>
                <span className="text-greyText font-normal text-[0.813rem]">{transaction.currency}</span>
              </td>

              <td className="pl-6 pb-2 pt-6">
                <div className="flex flex-row">
                  <span className="mr-2">
                    <PaymentMethodIcon paymentMethod={transaction.paymentMethod}></PaymentMethodIcon>
                  </span>
                  <span className="text-sm">{transaction.processor}</span>
                  {transaction.paymentMethod === PaymentMethod.Card && transaction.last4DigitsOfCardNumber && (
                    <span className="text-sm ml-1">.... .... .... {transaction.last4DigitsOfCardNumber}</span>
                  )}
                </div>
              </td>
              <td className="pl-6 pb-2 pt-6">
                <div className="w-[60px] text-[0.813rem] h-6 ">
                  <AnimatePresence>
                    {hoveredRow === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[0.813rem] px-2 py-1 rounded-full bg-[#DEE6ED] leading-4 cursor-pointer"
                      >
                        Refund
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
