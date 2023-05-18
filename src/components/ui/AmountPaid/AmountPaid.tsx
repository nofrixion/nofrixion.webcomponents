import classNames from 'classnames';
import { Currency } from '../../../api/types/Enums';

const AmountPaid = ({
  amountPaid,
  totalAmount,
  currency,
}: {
  amountPaid: number;
  totalAmount: number;
  currency: Currency.EUR | Currency.GBP;
}) => {
  const percentagePaid = amountPaid > totalAmount ? 100 : (amountPaid / totalAmount) * 100;
  const outstandingAmount = amountPaid > totalAmount ? 0 : totalAmount - amountPaid;
  return (
    <div className="flex flex-col">
      <span
        className={classNames('text-[2rem] tabular-nums font-semibold leading-8 mb-4', {
          'text-greyText': amountPaid === 0,
          'text-defaultText': amountPaid > 0,
        })}
      >
        {currency == Currency.GBP ? '£' : '€'}
        {amountPaid === 0 ? totalAmount : amountPaid.toFixed(2)}
      </span>
      <div className="flex flex-row h-[0.125rem]">
        {percentagePaid !== 0 && (
          <div className="bg-positiveActionBackground rounded-l-sm" style={{ flexGrow: `${percentagePaid}` }}></div>
        )}
        <div className="bg-greyBg rounded-r-sm" style={{ flexGrow: `${100 - percentagePaid}` }}></div>
      </div>
      {amountPaid > 0 && (
        <span className="text-sm leading-[1.063rem] text-greyText font-medium mt-2">
          {currency == Currency.GBP ? '£' : '€'}
          <span className="tabular-nums">{outstandingAmount.toFixed(2)}</span> outstanding
        </span>
      )}
    </div>
  );
};

export default AmountPaid;
