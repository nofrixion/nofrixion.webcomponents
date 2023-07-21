import FilterButton from '../FilterButton/FilterButton';
import disabledCurrencyIcon from '../../../assets/icons/currency-icon-disabled.svg';
import enabledCurrencyIcon from '../../../assets/icons/currency-icon-enabled.svg';
import { formatAmount } from '../../../utils/formatters';
import closeIcon from '../../../assets/images/nf_close.svg';
import SelectablePill from '../SelectablePill/SelectablePill';
import React, { useEffect } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';

export interface AmountFilterProps {
  currency?: string;
  setCurrency?: (currency?: string) => void;
  minAmount?: number;
  setMinAmount?: (minAmount?: number) => void;
  maxAmount?: number;
  setMaxAmount?: (maxAmount?: number) => void;
}

export interface ActiveFilterControlProps {
  label: string;
  onClick: () => void;
}

const ActiveFilterControl: React.FC<ActiveFilterControlProps> = ({ label, onClick }) => {
  const onClose = (event: React.PointerEvent<HTMLAnchorElement>) => {
    onClick();
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="inline-flex space-x-2 px-2 items-center rounded-full border border-solid border-borderGreyHighlighted">
      <span className="text-default-text text-sm leading-6">{label}</span>
      <a onPointerDown={onClose} role="button" href="">
        <img src={closeIcon} alt="Close" title="Close" className="w-2 h-2" />
      </a>
    </div>
  );
};

const AmountFilter: React.FC<AmountFilterProps> = ({
  currency,
  setCurrency,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
}) => {
  const [localCurrency, setLocalCurrency] = React.useState<string>(currency ?? '');
  const [localMinAmount, setLocalMinAmount] = React.useState<string>(minAmount ? minAmount.toString() : '');
  const [localMaxAmount, setLocalMaxAmount] = React.useState<string>(maxAmount ? maxAmount.toString() : '');
  const [isFiltered, setIsFiltered] = React.useState<boolean>(false);

  const commonInputClassNames = 'outline-none border border-solid border-borderGrey rounded px-2 py-1 appearance-none';

  const maskOptions = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
    decimalSymbol: '.',
    decimalLimit: 0,
    integerLimit: 7,
    allowNegative: false,
    allowLeadingZeroes: false,
  };

  const currencyMask = createNumberMask({
    ...maskOptions,
  });

  useEffect(() => {
    checkIfIsFiltered();
  }, [currency, minAmount, maxAmount]);

  const onReset = () => {
    clearCurrency();
    clearMinAmount();
    clearMaxAmount();
  };

  const onCancel = () => {
    setLocalCurrency(currency ?? '');
    setLocalMinAmount(minAmount ? minAmount.toString() : '');
    setLocalMaxAmount(maxAmount ? maxAmount.toString() : '');
  };

  const onApply = () => {
    if (setCurrency) {
      setCurrency(localCurrency);
    }

    if (setMinAmount) {
      setMinAmount(localMinAmount ? Number(localMinAmount) : undefined);
    }

    if (setMaxAmount) {
      setMaxAmount(localMaxAmount ? Number(localMaxAmount) : undefined);
    }

    setIsFiltered(!!(localCurrency || localMinAmount || localMaxAmount));
  };

  const onMinAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const masked = event.target.value;
    event.target.value = event.target.value.replace(/[^\d\.\-]/g, '');
    setLocalMinAmount(event.target.value);
    event.target.value = masked;
  };

  const onMaxAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const masked = event.target.value;
    event.target.value = event.target.value.replace(/[^\d\.\-]/g, '');
    setLocalMaxAmount(event.target.value);
    event.target.value = masked;
  };

  const clearCurrency = (preventDefault: boolean = true) => {
    setLocalCurrency('');

    if (setCurrency) {
      setCurrency(undefined);
    }
  };

  const clearMinAmount = () => {
    setLocalMinAmount('');

    if (setMinAmount) {
      setMinAmount(undefined);
    }
  };

  const clearMaxAmount = () => {
    setLocalMaxAmount('');

    if (setMaxAmount) {
      setMaxAmount(undefined);
    }
  };

  const checkIfIsFiltered = () => {
    setIsFiltered(!!(currency || minAmount || maxAmount));
  };

  const getCurrencyName = (currency: string) => {
    switch (currency) {
      case 'EUR':
        return 'Euros';
      case 'GBP':
        return 'Pounds';
      default:
        return '';
    }
  };

  return (
    <FilterButton
      label="Amount"
      defaultIconSource={disabledCurrencyIcon}
      highlightedIconSource={enabledCurrencyIcon}
      isFiltered={isFiltered}
      onReset={onReset}
      onApply={onApply}
      onCancel={onCancel}
    >
      <FilterButton.Body>
        <div
          className="grid grid-flow-row gap-4 text-13px leading-6 items-center"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <div>
            <span>Currency</span>
          </div>
          <div className="flex space-x-2">
            <SelectablePill
              label="Euros"
              groupName="currency"
              value="EUR"
              selected={localCurrency === 'EUR'}
              onValueChange={setLocalCurrency}
            />
            <SelectablePill
              label="Pounds"
              groupName="currency"
              value="GBP"
              selected={localCurrency === 'GBP'}
              onValueChange={setLocalCurrency}
            />
          </div>
          <div>
            <span>Min amount</span>
          </div>
          <div>
            <MaskedInput
              mask={currencyMask}
              className={commonInputClassNames}
              value={localMinAmount}
              onChange={onMinAmountChange}
            />
          </div>
          <div>
            <span>Max amount</span>
          </div>
          <div>
            <MaskedInput
              mask={currencyMask}
              className={commonInputClassNames}
              value={localMaxAmount}
              onChange={onMaxAmountChange}
            />
          </div>
        </div>
      </FilterButton.Body>
      <FilterButton.FilteredLayout>
        <div className="inline-flex space-x-2 items-center">
          <img src={enabledCurrencyIcon} alt="Filter" title="Filter" className="w-4 h-4" />
          {minAmount && <ActiveFilterControl label={'Min ' + formatAmount(minAmount, 0)} onClick={clearMinAmount} />}
          {maxAmount && <ActiveFilterControl label={'Max ' + formatAmount(maxAmount, 0)} onClick={clearMaxAmount} />}
          {currency && <ActiveFilterControl label={getCurrencyName(currency)} onClick={clearCurrency} />}
        </div>
      </FilterButton.FilteredLayout>
    </FilterButton>
  );
};

export default AmountFilter;
