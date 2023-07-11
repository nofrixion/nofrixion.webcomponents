import React from 'react';
import InputAmountField from '../InputAmountField/InputAmountField';
import { Currency } from '@nofrixion/moneymoov';
import backButtonIcon from '../../../assets/icons/back-button-icon.svg';
import { format } from 'date-fns';
import { localCurrency } from '../../../utils/constants';

export interface CaptureModalProps {
  initialAmount: string;
  currency: Currency.EUR | Currency.GBP;
  onCapture: () => void;
  onDismiss: () => void;
  setAmountToCapture: (amount: string) => void;
  totalTransactionAmount: number;
  lastFourDigitsOnCard?: string;
  processor?: string;
  transactionDate: Date;
  contactName?: string;
}

const CaptureModal: React.FC<CaptureModalProps> = ({
  initialAmount,
  currency,
  onCapture,
  onDismiss,
  setAmountToCapture,
  totalTransactionAmount,
  lastFourDigitsOnCard,
  processor,
  transactionDate,
  contactName,
}) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR ? localCurrency.eur.symbol : localCurrency.gbp.symbol;
  };

  return (
    <>
      <div className="bg-white h-screen overflow-auto w-[37.5rem] px-8 py-8">
        <div className="max-h-full">
          <div className="h-fit">
            <button type="button" className="hover:cursor-pointer block" onClick={onDismiss}>
              <img src={backButtonIcon} alt="Back" title="Back" className="w-6 h-auto" />
            </button>
            <span className="block text-2xl font-semibold text-defaultText mt-8">Confirm card payment capture</span>
            <p className="mt-12 text-defaultText text-sm font-normal">
              You are about to capture the card payment made
              {contactName && <span className="font-semibold">{` by ${contactName}`}</span>}
              &nbsp;on&nbsp;
              <span className="font-semibold">{format(transactionDate, 'MMM do, yyyy')}</span>
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
            <table className="mt-12" cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr>
                  <td className="w-[152px]">
                    <span className="text-sm leading-8 font-normal text-greyText">Capture</span>
                  </td>
                  <td>
                    <div className="w-40">
                      <InputAmountField
                        currency={currency}
                        onCurrencyChange={() => {}}
                        allowCurrencyChange={false}
                        value={formatter.format(Number(initialAmount))}
                        onChange={(e) => setAmountToCapture(e.target.value)}
                      ></InputAmountField>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <span className="text-13px leading-5 font-normal text-greyText">
                      Total payment was&nbsp;{getCurrencySymbol(currency)}&nbsp;
                      {formatter.format(totalTransactionAmount)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-14 inline-flex justify-center rounded-full bg-[#006A80] py-3 px-16 text-sm text-white font-semibold transition w-full cursor-pointer hover:bg-[#144752]"
              onClick={onCapture}
            >
              Confirm capture
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptureModal;
