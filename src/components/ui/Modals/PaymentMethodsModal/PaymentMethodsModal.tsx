import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import Switch from '../../Switch/Switch';

import BankIcon from '../../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../../assets/icons/card-icon.svg';
import ApplePayIcon from '../../../../assets/icons/wallet-icon.svg';
import BitcoinIcon from '../../../../assets/icons/bitcoin-icon.svg';
import { useEffect, useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { AnimatePresence } from 'framer-motion';
import Select from '../../Select/Select';
import AnimateHeightWrapper from '../../utils/AnimateHeight';
import { LocalPaymentMethodsFormValue } from '../../../../types/LocalTypes';
import { BankSettings, PaymentMethodsDefaults } from '@nofrixion/moneymoov';

interface PaymentMethodsModalProps extends BaseModalProps {
  banks: BankSettings[];
  userDefaults?: PaymentMethodsDefaults;
  onApply: (data: LocalPaymentMethodsFormValue) => void;
  isPrefilledData: boolean;
}

const PaymentMethodsModal = ({
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
      enableUseAsDefault
      isDefault={isDefault}
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
    >
      <div className="divide-y">
        <div className="pb-6 md:pb-4">
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
                <div className="ml-10 pt-7 md:pb-4 flex flex-col space-y-4">
                  <Checkbox
                    label="Enable Apple Pay / Google Pay"
                    infoText="Enable this option to allow users to pay with Apple Pay or Google Pay."
                    value={isWalletEnabled}
                    onChange={setIsWalletEnabled}
                  />
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
          className="pt-6 md:pt-4"
        />
      </div>
    </CustomModal>
  );
};

export default PaymentMethodsModal;
