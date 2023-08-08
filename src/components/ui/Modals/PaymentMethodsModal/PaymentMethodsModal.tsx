import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import Switch from '../../Switch/Switch';

import BankIcon from '../../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../../assets/icons/card-icon.svg';
import ApplePayIcon from '../../../../assets/icons/wallet-icon.svg';
import BitcoinIcon from '../../../../assets/icons/bitcoin-icon.svg';
import React, { useEffect, useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { AnimatePresence } from 'framer-motion';
import Select from '../../Select/Select';
import AnimateHeightWrapper from '../../utils/AnimateHeight';
import { LocalPaymentMethodsFormValue } from '../../../../types/LocalTypes';
import { BankSettings, PaymentMethodsDefaults } from '@nofrixion/moneymoov';

interface PaymentMethodsModalProps extends BaseModalProps {
  amount: string;
  currencySymbol: '€' | '£';
  minimumCurrencyAmount: number;
  banks: BankSettings[];
  userDefaults?: PaymentMethodsDefaults;
  onApply: (data: LocalPaymentMethodsFormValue) => void;
  isPrefilledData: boolean;
}

const PaymentMethodsModal = ({
  amount,
  currencySymbol,
  minimumCurrencyAmount,
  open,
  banks,
  userDefaults,
  onDismiss,
  onApply,
  isPrefilledData = false,
}: PaymentMethodsModalProps) => {
  const [isBankEnabled, setIsBankEnabled] = useState<boolean>(userDefaults?.pisp ?? true);
  const [isCardEnabled, setIsCardEnabled] = useState<boolean>(userDefaults?.card ?? true);
  const [isWalletEnabled, setIsWalletEnabled] = useState<boolean>(userDefaults?.wallet ?? true);
  const [isLightningEnabled, setIsLightningEnabled] = useState<boolean>(userDefaults?.lightning ?? false);
  const [isPriorityBankEnabled, setIsPriorityBankEnabled] = useState<boolean>(userDefaults?.pispPriorityBank ?? false);
  const [isCaptureFundsEnabled, setIsCaptureFundsEnabled] = useState<boolean>(!userDefaults?.cardAuthorizeOnly ?? true);
  const [isDefault, setIsDefault] = useState<boolean>(!isPrefilledData && !!userDefaults);
  const [priorityBank, setPriorityBank] = useState<BankSettings | undefined>();
  const [currentState, setCurrentState] = useState<LocalPaymentMethodsFormValue>();
  const [enableUseAsDefault, setEnableUseAsDefault] = useState<boolean>(false);
  const [applyEnabled, setApplyEnabled] = useState<boolean>(true);

  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const numberAmount = Number(amount);

  useEffect(() => {
    setEnableUseAsDefault(
      !userDefaults ||
        userDefaults?.pisp !== isBankEnabled ||
        userDefaults?.card !== isCardEnabled ||
        userDefaults?.wallet !== isWalletEnabled ||
        userDefaults?.lightning !== isLightningEnabled ||
        userDefaults?.cardAuthorizeOnly === isCaptureFundsEnabled ||
        userDefaults?.pispPriorityBank !== isPriorityBankEnabled ||
        (isPriorityBankEnabled && userDefaults?.pispPriorityBankID !== priorityBank?.bankID),
    );

    // Enabled unless PISP is enabled and amount is less than minimum.
    setApplyEnabled(!(isBankEnabled && amount && Number(amount) < minimumCurrencyAmount));
  }, [
    isBankEnabled,
    isCardEnabled,
    isWalletEnabled,
    isLightningEnabled,
    isCaptureFundsEnabled,
    isPriorityBankEnabled,
    priorityBank,
    minimumCurrencyAmount,
    amount,
  ]);

  useEffect(() => {
    if (userDefaults?.pispPriorityBank && userDefaults?.pispPriorityBankID) {
      const bank = banks.find((bank) => bank.bankID === userDefaults.pispPriorityBankID);
      setPriorityBank(bank);
      setIsPriorityBankEnabled(true);
    }
  }, []);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentMethodsFormValue = {
      isBankEnabled,
      isCardEnabled,
      isWalletEnabled,
      isLightningEnabled,
      isCaptureFundsEnabled,
      priorityBank:
        isPriorityBankEnabled && priorityBank
          ? {
              id: priorityBank.bankID,
              name: priorityBank.bankName,
            }
          : undefined,
      isDefault: data.isDefaultChecked,
    };

    if (isPriorityBankEnabled && !priorityBank) {
      formData.priorityBank = {
        id: banks[0].bankID,
        name: banks[0].bankName,
      };
    }

    setCurrentState(formData);
    onApply(formData);

    return formData;
  };

  const handleOnDismiss = () => {
    onDismiss();

    // Reset to initial state
    if (currentState) {
      setIsDefault(currentState.isDefault);
      setIsBankEnabled(currentState.isBankEnabled);
      setIsCardEnabled(currentState.isCardEnabled);
      setIsWalletEnabled(currentState.isWalletEnabled);
      setIsLightningEnabled(currentState.isLightningEnabled);
      setIsCaptureFundsEnabled(currentState.isCaptureFundsEnabled);
      setIsPriorityBankEnabled(currentState.isBankEnabled);

      if (currentState.isBankEnabled && currentState.priorityBank) {
        const bank = banks.find((bank) => bank.bankID === currentState.priorityBank?.id);
        setPriorityBank(bank);
        setIsPriorityBankEnabled(true);
      } else {
        setPriorityBank(undefined);
        setIsPriorityBankEnabled(false);
      }
    } else {
      setIsDefault(isDefault);
      setIsBankEnabled(userDefaults?.pisp ?? true);
      setIsCardEnabled(userDefaults?.card ?? true);
      setIsWalletEnabled(userDefaults?.wallet ?? true);
      setIsLightningEnabled(userDefaults?.lightning ?? false);
      setIsCaptureFundsEnabled(!userDefaults?.cardAuthorizeOnly ?? true);
      setIsPriorityBankEnabled(userDefaults?.pispPriorityBank ?? false);

      if (userDefaults?.pispPriorityBank && userDefaults?.pispPriorityBankID) {
        const bank = banks.find((bank) => bank.bankID === userDefaults.pispPriorityBankID);
        setPriorityBank(bank);
        setIsPriorityBankEnabled(true);
      } else {
        setPriorityBank(undefined);
        setIsPriorityBankEnabled(false);
      }
    }
  };

  return (
    <CustomModal
      title="Payment methods"
      open={open}
      enableUseAsDefault={enableUseAsDefault}
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
      onApplyEnabled={applyEnabled}
      buttonRowClassName={isWalletEnabled && !isCardEnabled && !isBankEnabled && !isLightningEnabled ? 'md:mt-6' : ''}
    >
      <div className="[&>*]:border-b [&>*]:border-solid [&>*]:border-b-borderGrey">
        <Switch
          icon={ApplePayIcon}
          label="Apple Pay / Google Pay"
          value={isWalletEnabled}
          onChange={setIsWalletEnabled}
          className="pb-6 md:pb-4"
        />
        <div className="py-6 md:py-4">
          <Switch icon={BankIcon} label="Pay by Bank" value={isBankEnabled} onChange={setIsBankEnabled} />

          <AnimatePresence initial={false}>
            {isBankEnabled && banks.length > 0 && (
              <AnimateHeightWrapper layoutId="checkbox-priority-bank">
                <div className="pl-6 md:pl-10 pt-7 md:pb-4">
                  <Checkbox
                    label="Define a priority bank"
                    infoText="Select a priority bank to set it as the default payment option for users. This streamlines the payment process by displaying the preferred bank first."
                    value={isPriorityBankEnabled}
                    onChange={setIsPriorityBankEnabled}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isBankEnabled && isPriorityBankEnabled && (
              <AnimateHeightWrapper layoutId="select-priority-bank">
                <div className="pl-6 md:pl-[3.25rem] pt-4 md:pt-0">
                  <Select
                    options={banks.map((bank) => {
                      return {
                        value: bank.bankID,
                        label: bank.bankName,
                      };
                    })}
                    selected={
                      !priorityBank
                        ? {
                            value: banks[0].bankID,
                            label: banks[0].bankName,
                          }
                        : {
                            value: priorityBank.bankID,
                            label: priorityBank.bankName,
                          }
                    }
                    onChange={(selectedOption) => {
                      setPriorityBank(banks.find((bank) => bank.bankID === selectedOption.value) ?? banks[0]);
                    }}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <div className="py-6 md:py-4">
          <Switch icon={CardIcon} label="Credit and debit card" value={isCardEnabled} onChange={setIsCardEnabled} />

          <AnimatePresence initial={false}>
            {isCardEnabled && (
              <AnimateHeightWrapper layoutId="card-capture-founds">
                <div className="ml-10 pt-7 md:pb-4">
                  <Checkbox
                    label="Don't capture funds on card payments"
                    infoText="Enable this option to authorize card payments without immediately capturing the funds. This allows for manual capture or cancellation before completing the transaction."
                    value={!isCaptureFundsEnabled}
                    onChange={(value) => setIsCaptureFundsEnabled(!value)}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <Switch
          icon={BitcoinIcon}
          label="Bitcoin Lightning"
          value={isLightningEnabled}
          onChange={setIsLightningEnabled}
          className="py-6 md:py-4"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <AnimatePresence>
          {isBankEnabled && amount && numberAmount < minimumCurrencyAmount && (
            <AnimateHeightWrapper layoutId="amount-pisp-alert">
              <div className="w-full p-3 mt-6 bg-warningYellow rounded">
                <p className="text-sm text-default-text font-normal">
                  The minimum amount for bank payments is {currencySymbol}
                  {formatter.format(minimumCurrencyAmount)}. You must use another payment method for lower amounts.
                </p>
              </div>
            </AnimateHeightWrapper>  
          )}
          {isWalletEnabled && !isCardEnabled && !isBankEnabled && !isLightningEnabled && (
            <AnimateHeightWrapper layoutId="wallet-card-alert">
              <div className="w-full p-3 mt-6 bg-warningYellow rounded">
                <p className="text-sm text-default-text font-normal">
                  Do your customers have access to Apple Pay or Google Pay? If you are unsure, you may want to consider
                  adding a second payment method as a backup.
                </p>
              </div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
    </CustomModal>
  );
};

export default PaymentMethodsModal;
