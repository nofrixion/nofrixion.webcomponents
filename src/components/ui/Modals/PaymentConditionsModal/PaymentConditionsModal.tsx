import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { LocalPaymentConditionsFormValue } from '../../../../types/LocalTypes';
import { PaymentConditionsDefaults, UserPaymentDefaults } from '@nofrixion/moneymoov';

interface PaymentConditionsModalProps extends BaseModalProps {
  userDefaults?: PaymentConditionsDefaults;
  onApply: (data: LocalPaymentConditionsFormValue) => void;
  isPrefilledData: boolean;
}

const PaymentConditionsModal = ({
  open,
  userDefaults,
  onDismiss,
  onApply,
  isPrefilledData = false,
}: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(
    userDefaults ? userDefaults.allowPartialPayments : false,
  );
  const [isDefault, setIsDefault] = useState<boolean>(!isPrefilledData && !!userDefaults);
  const [currentState, setCurrentState] = useState<LocalPaymentConditionsFormValue>();

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentConditionsFormValue = {
      allowPartialPayments: isAllowPartialEnabled,
      isDefault: data.isDefaultChecked,
    };

    onApply(formData);
    setCurrentState(formData);

    return formData;
  };

  const handleOnDismiss = () => {
    onDismiss();

    // Reset to initial state
    if (currentState) {
      setIsAllowPartialEnabled(currentState.allowPartialPayments);
    } else {
      setIsAllowPartialEnabled(userDefaults ? userDefaults.allowPartialPayments : false);
    }
  };

  return (
    <CustomModal
      title="Payment conditions"
      open={open}
      enableUseAsDefault
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
      isDefault={isDefault}
    >
      <div className="py-1">
        <Checkbox
          label="Allow partial payments"
          description="Enable customers to pay a portion of the total amount owed, rather than the full balance all at once."
          value={isAllowPartialEnabled}
          onChange={setIsAllowPartialEnabled}
        />
      </div>
    </CustomModal>
  );
};

export default PaymentConditionsModal;
