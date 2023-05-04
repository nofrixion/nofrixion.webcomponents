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

const banksOptions = ['Revolut', 'Fineco', 'Bank of Ireland', 'NoFrixion', 'AIB']; // TODO: Get this from the API

interface PaymentMethodsModalProps extends BaseModalProps {
  value: LocalPaymentMethodsFormValue;
  onApply: (data: LocalPaymentMethodsFormValue) => void;
}

const PaymentMethodsModal = ({ open, value, onDismiss, onApply }: PaymentMethodsModalProps) => {
  const [isBankEnabled, setIsBankEnabled] = useState<boolean>(value.isBankEnabled);
  const [isCardEnabled, setIsCardEnabled] = useState<boolean>(value.isCardEnabled);
  const [isWalletEnabled, setIsWalletEnabled] = useState<boolean>(value.isWalletEnabled);
  const [isLightningEnabled, setIsLightningEnabled] = useState<boolean>(value.isLightningEnabled);

  const [isPriorityBankEnabled, setIsPriorityBankEnabled] = useState<boolean>(false);

  const [priorityBank, setPriorityBank] = useState<string>(banksOptions[0]);

  const [isCaptureFundsEnabled, setIsCaptureFundsEnabled] = useState<boolean>(value.isCardEnabled);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = () => {
    const formData: LocalPaymentMethodsFormValue = {
      isBankEnabled,
      isCardEnabled,
      isWalletEnabled,
      isLightningEnabled,
      isCaptureFundsEnabled,
      priorityBank: isPriorityBankEnabled ? priorityBank : undefined,
    };

    onApply(formData);

    return formData;
  };

  return (
    <CustomModal
      title="Available methods"
      open={open}
      enableUseAsDefault
      onDismiss={onDismiss}
      onApply={onApplyClicked}
    >
      <div className="divide-y">
        <div className="py-4">
          <Switch icon={BankIcon} label="Bank transfer" value={isBankEnabled} onChange={setIsBankEnabled} />

          <AnimatePresence initial={false}>
            {isBankEnabled && (
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
                  <Select options={banksOptions} selected={priorityBank} onChange={setPriorityBank} />
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
