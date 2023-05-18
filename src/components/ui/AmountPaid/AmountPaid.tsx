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
    <>
      <div className="flex flex-col">
        <span
          className={`text-[2rem] tabular-nums font-semibold leading-8 mb-4  ${
            amountPaid === 0 ? 'text-[#73808C]' : 'text-[#00264D]'
          }`}
        >
          {currency == Currency.GBP ? '£' : '€'}
          {amountPaid === 0 ? totalAmount : amountPaid.toFixed(2)}
        </span>
        <div className="flex flex-row h-[0.125rem]">
          <div className="bg-[#40BFBF] rounded-l-sm" style={{ flexGrow: `${percentagePaid}` }}></div>
          <div className="bg-[#EDF2F7] rounded-r-sm" style={{ flexGrow: `${100 - percentagePaid}` }}></div>
        </div>
        {amountPaid > 0 && (
          <span className="text-sm leading-[1.063rem] text-[#73808C] font-medium mt-2">
            {currency == Currency.GBP ? '£' : '€'}
            <span className="tabular-nums">{outstandingAmount.toFixed(2)}</span> outstanding
          </span>
        )}
      </div>
    </>
  );
};

export default AmountPaid;
