import { Currency } from '../../../api/types/Enums';
import { LocalPartialPaymentMethods } from '../../../types/LocalEnums';

const AmountPaid = ({
  amountPaid,
  totalAmount,
  currency,
  partialPaymentMethod,
}: {
  amountPaid: number;
  totalAmount: number;
  currency: Currency.EUR | Currency.GBP;
  partialPaymentMethod: LocalPartialPaymentMethods;
}) => {
  const percentagePaid = amountPaid > totalAmount ? 100 : (amountPaid / totalAmount) * 100;
  const outstandingAmount = amountPaid > totalAmount ? 0 : totalAmount - amountPaid;
  return (
    <div className="flex flex-col">
      <span className="text-[2rem] tabular-nums font-semibold leading-8 mb-4 text-defaultText">
        {currency == Currency.GBP ? '£' : '€'}
        {new Intl.NumberFormat(navigator.language).format(Number(totalAmount.toFixed(2)))}
      </span>
      {partialPaymentMethod === LocalPartialPaymentMethods.Partial && (
        <div className="flex flex-row h-[0.125rem]">
          {percentagePaid !== 0 && (
            <div className="bg-positiveActionBackground rounded-l-sm" style={{ flexGrow: `${percentagePaid}` }}></div>
          )}
          <div className="bg-greyBg rounded-r-sm" style={{ flexGrow: `${100 - percentagePaid}` }}></div>
        </div>
      )}

      {amountPaid > 0 && (
        <span className="text-sm leading-[1.063rem] text-greyText font-medium mt-2">
          {currency == Currency.GBP ? '£' : '€'}
          <span className="tabular-nums">
            {new Intl.NumberFormat(navigator.language).format(Number(outstandingAmount.toFixed(2)))}
          </span>{' '}
          outstanding
        </span>
      )}
    </div>
  );
};

export default AmountPaid;
