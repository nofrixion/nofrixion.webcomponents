import { Currency } from '../../../api/types/Enums';

const AmountPaid = ({
  amountPaid,
  totalAmount,
  currency,
}: {
  amountPaid: number;
  totalAmount: number;
  currency: Currency;
}) => {
  const percentagePaid = (amountPaid / totalAmount) * 100;
  return (
    <>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold leading-8 mb-4 text-[#00264D]">
          {currency == 'GBP' ? '£' : '€'}
          {amountPaid.toFixed(2)}
        </span>
        <div className="flex flex-row h-[0.125rem]">
          <div className="bg-[#40BFBF]" style={{ flexGrow: `${percentagePaid}` }}></div>
          <div className="bg-[#EDF2F7]" style={{ flexGrow: `${100 - percentagePaid}` }}></div>
        </div>
        <span className="text-sm leading-5 text-[#73808C] font-medium mt-2">
          {currency == 'GBP' ? '£' : '€'}
          {(totalAmount - amountPaid).toFixed(2)} outstanding
        </span>
      </div>
    </>
  );
};

export default AmountPaid;
