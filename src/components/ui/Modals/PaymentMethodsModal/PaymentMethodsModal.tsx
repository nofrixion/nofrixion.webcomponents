import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import Switch from '../../Switch/Switch';

import BankIcon from '../../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../../assets/icons/card-icon.svg';
import ApplePayIcon from '../../../../assets/icons/wallet-icon.svg';
import BitcoinIcon from '../../../../assets/icons/bitcoin-icon.svg';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { AnimatePresence } from 'framer-motion';
import Select from '../../Select/Select';
import AnimateHeightWrapper from '../../utils/AnimateHeight';
import { LocalPaymentMethodsFormValue } from '../../../../api/types/LocalTypes';
import { BankSettings } from '../../../../api/types/ApiResponses';

interface PaymentMethodsModalProps extends BaseModalProps {
  banks: BankSettings[];
  value: LocalPaymentMethodsFormValue;
  onApply: (data: LocalPaymentMethodsFormValue) => void;
}

const PaymentMethodsModal = ({ open, banks, value, onDismiss, onApply }: PaymentMethodsModalProps) => {
  const [isBankEnabled, setIsBankEnabled] = useState<boolean>(value.isBankEnabled);
  const [isCardEnabled, setIsCardEnabled] = useState<boolean>(value.isCardEnabled);
  const [isWalletEnabled, setIsWalletEnabled] = useState<boolean>(value.isWalletEnabled);
  const [isLightningEnabled, setIsLightningEnabled] = useState<boolean>(value.isLightningEnabled);

  const [isPriorityBankEnabled, setIsPriorityBankEnabled] = useState<boolean>(false);

  const [priorityBank, setPriorityBank] = useState<BankSettings | undefined>();

  const [isCaptureFundsEnabled, setIsCaptureFundsEnabled] = useState<boolean>(value.isCardEnabled);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = () => {
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
    };

    onApply(formData);

    return formData;
  };

  return (
    <CustomModal title="Payment methods" open={open} enableUseAsDefault onDismiss={onDismiss} onApply={onApplyClicked}>
      <div className="divide-y">
        <div className="py-4">
          <Switch icon={BankIcon} label="Bank transfer" value={isBankEnabled} onChange={setIsBankEnabled} />

          <AnimatePresence initial={false}>
            {isBankEnabled && banks.length > 0 && (
              <AnimateHeightWrapper layoutId="checkbox-priority-bank">
                <div className="pl-10 pt-7 pb-4">
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
                <div className="pl-[3.25rem]">
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
        <div className="py-4">
          <Switch icon={CardIcon} label="Credit and debit card" value={isCardEnabled} onChange={setIsCardEnabled} />

          <AnimatePresence initial={false}>
            {isCardEnabled && (
              <AnimateHeightWrapper layoutId="card-capture-founds">
                <div className="ml-10 pt-7 pb-4">
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
          icon={ApplePayIcon}
          label="Apple Pay / Google Pay"
          value={isWalletEnabled}
          onChange={setIsWalletEnabled}
          className="py-4"
        />
        <Switch
          icon={BitcoinIcon}
          label="Bitcoin Lightning"
          value={isLightningEnabled}
          onChange={setIsLightningEnabled}
          className="py-4"
        />
      </div>
    </CustomModal>
  );
};

export default PaymentMethodsModal;
