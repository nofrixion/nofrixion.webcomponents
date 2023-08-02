import React from 'react';
import InputAmountField from '../InputAmountField/InputAmountField';
import { Currency } from '@nofrixion/moneymoov';
import { format } from 'date-fns';
import { localCurrency } from '../../../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../atoms';

export interface CardRefundModalProps {
  initialAmount: string;
  currency: Currency.EUR | Currency.GBP;
  onRefund: () => Promise<void>;
  onDismiss: () => void;
  setAmountToRefund: (amount: string) => void;
  maxRefundableAmount: number;
  lastFourDigitsOnCard?: string;
  processor?: string;
  transactionDate: Date;
  contactName?: string;
  IsPartialRefundPossible: boolean;
}

const CardRefundModal: React.FC<CardRefundModalProps> = ({
  initialAmount,
  currency,
  onRefund,
  onDismiss,
  setAmountToRefund,
  maxRefundableAmount,
  lastFourDigitsOnCard,
  processor,
  transactionDate,
  contactName,
  IsPartialRefundPossible,
}) => {
  const [isRefundButtonDisabled, setIsRefundButtonDisabled] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR ? localCurrency.eur.symbol : localCurrency.gbp.symbol;
  };

  const onRefundClick = async () => {
    setIsRefundButtonDisabled(true);

    setValidationErrorMessage('');
    let parsedAmount = Number(initialAmount);
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.');
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.");
    } else if (maxRefundableAmount && parsedAmount > maxRefundableAmount) {
      setValidationErrorMessage("You can't refund more than the remaining amount.");
    } else {
      await onRefund();
    }

    setIsRefundButtonDisabled(false);
  };

  const onAmountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrorMessage('');
    setAmountToRefund(event.target.value);
  };

  return (
    <>
      <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
        <div className="max-h-full">
          <div className="h-fit">
            <button type="button" className="hover:cursor-pointer block" onClick={onDismiss}>
              <Icon name="back/24" />
            </button>
            <span className="block text-2xl font-semibold text-defaultText mt-8">Confirm card payment refund</span>
            <p className="mt-12 text-defaultText text-sm font-normal">
              {!IsPartialRefundPossible && (
                <span>
                  You are about to refund{' '}
                  <span className="font-semibold">{formatter.format(Number(initialAmount))}</span> to{' '}
                  {contactName && <span className="font-semibold">{contactName}</span>} for the card payment made
                </span>
              )}
              {IsPartialRefundPossible && (
                <span>
                  You are about to refund the card payment made
                  {contactName && <span className="font-semibold">{` by ${contactName}`}</span>}
                </span>
              )}{' '}
              on <span className="font-semibold">{format(transactionDate, 'MMM do, yyyy')}</span>
              {lastFourDigitsOnCard ? (
                <>
                  {' with the'}
                  {processor && <span className="font-semibold">{` ${processor}`}</span>}
                  {` card ending in ${lastFourDigitsOnCard}.`}
                </>
              ) : (
                '.'
              )}
            </p>
            {IsPartialRefundPossible && (
              <div className="mt-12 md:flex">
                <div className="md:w-[152px]">
                  <span className="text-sm leading-8 font-normal text-greyText md:leading-[48px]">Refund</span>
                </div>

                <div className="text-left">
                  <div className="md:w-40">
                    <InputAmountField
                      currency={currency}
                      onCurrencyChange={() => {}}
                      allowCurrencyChange={false}
                      value={formatter.format(Number(initialAmount))}
                      onChange={(e) => setAmountToRefund(e.target.value)}
                    ></InputAmountField>
                  </div>
                  <span className="mt-2 block text-13px leading-5 font-normal text-greyText">
                    There are {getCurrencySymbol(currency)} {formatter.format(maxRefundableAmount)} available to refund.
                  </span>
                  <AnimatePresence>
                    {validationErrorMessage && (
                      <motion.div
                        className="mt-6 bg-[#ffe6eb] text-sm p-3 rounded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {validationErrorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
            <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
              <button
                className="justify-center rounded-full bg-[#006A80] h-12 lg:h-11 px-16 text-sm text-white font-semibold transition w-full cursor-pointer hover:bg-[#144752]"
                onClick={onRefundClick}
                disabled={isRefundButtonDisabled}
              >
                Confirm refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRefundModal;
