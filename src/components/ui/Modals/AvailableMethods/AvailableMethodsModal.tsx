import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import Switch from '../../Switch/Switch';

import BankIcon from '../../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../../assets/icons/card-icon.svg';
import ApplePayIcon from '../../../../assets/icons/apple-icon.svg';
import BitcoinIcon from '../../../../assets/icons/bitcoin-icon.svg';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import Select from '../../Select/Select';

const banksOptions = ['Revolut', 'Fineco', 'Bank of Ireland', 'NoFrixion', 'AIB']; // TODO: Get this from the API

interface FormData {
  isBankEnabled: boolean;
  isCardEnabled: boolean;
  isAppleEnabled: boolean;
  isBitcoinEnabled: boolean;
  isCaptureFundsEnabled: boolean;
  priorityBank?: string;
}

interface AvailableMethodsModalProps extends BaseModalProps {
  onApply: (data: FormData) => void;
}

const AnimateHeightWrapper = ({ children, key }: { children: React.ReactNode; key: string }) => {
  return (
    <motion.div
      key={key}
      className="overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 'auto',
        transitionEnd: {
          overflow: 'inherit',
        },
      }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

const AvailableMethodsModal = ({ open, onDismiss, onApply }: AvailableMethodsModalProps) => {
  const [isBankEnabled, setIsBankEnabled] = useState<boolean>(false);
  const [isCardEnabled, setIsCardEnabled] = useState<boolean>(false);
  const [isAppleEnabled, setIsAppleEnabled] = useState<boolean>(false);
  const [isBitcoinEnabled, setIsBitcoinEnabled] = useState<boolean>(false);

  const [isPriorityBankEnabled, setIsPriorityBankEnabled] = useState<boolean>(false);

  const [priorityBank, setPriorityBank] = useState<string>(banksOptions[0]);

  const [isCaptureFundsEnabled, setIsCaptureFundsEnabled] = useState<boolean>(false);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = () => {
    const formData: FormData = {
      isBankEnabled,
      isCardEnabled,
      isAppleEnabled,
      isBitcoinEnabled,
      isCaptureFundsEnabled,
      priorityBank: isPriorityBankEnabled ? priorityBank : undefined,
    };

    onApply(formData);

    return formData;
  };

  return (
    <CustomModal title="Available methods" open={open} onDismiss={onDismiss} onApply={onApplyClicked}>
      <div className="divide-y">
        <div className="py-4">
          <Switch icon={BankIcon} label="Bank transfer" value={isBankEnabled} onChange={setIsBankEnabled} />

          <AnimatePresence>
            {isBankEnabled && (
              <AnimateHeightWrapper key="checkbox-priority-bank">
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

            {isBankEnabled && isPriorityBankEnabled && (
              <AnimateHeightWrapper key="select-priority-bank">
                <div className="pl-[3.25rem]">
                  <Select options={banksOptions} selected={priorityBank} onChange={setPriorityBank} />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <div className="py-4">
          <Switch icon={CardIcon} label="Credit and debit card" value={isCardEnabled} onChange={setIsCardEnabled} />

          <AnimatePresence>
            {isCardEnabled && (
              <AnimateHeightWrapper key="card-capture-founds">
                <div className="ml-10 pt-7 pb-4">
                  <Checkbox
                    label="Don't capture funds on card payments"
                    infoText="Enable this option to authorize card payments without immediately capturing the funds. This allows for manual capture or cancellation before completing the transaction."
                    value={isCaptureFundsEnabled}
                    onChange={setIsCaptureFundsEnabled}
                  />
                </div>
              </AnimateHeightWrapper>
            )}
          </AnimatePresence>
        </div>
        <Switch
          icon={ApplePayIcon}
          label="Apple Pay"
          value={isAppleEnabled}
          onChange={setIsAppleEnabled}
          className="py-4"
        />
        <Switch
          icon={BitcoinIcon}
          label="Bitcoin Lightning"
          value={isBitcoinEnabled}
          onChange={setIsBitcoinEnabled}
          className="py-4"
        />
      </div>
    </CustomModal>
  );
};

AvailableMethodsModal.componentProps = {
  label: String,
};

export default AvailableMethodsModal;
