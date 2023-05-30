import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useEffect, useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { LocalPaymentConditionsFormValue } from '../../../../types/LocalTypes';
import { PaymentConditionsDefaults, UserPaymentDefaults } from '../../../../api/types/ApiResponses';

interface PaymentConditionsModalProps extends BaseModalProps {
  userDefaults?: PaymentConditionsDefaults;
  onApply: (data: LocalPaymentConditionsFormValue) => void;
}

const PaymentConditionsModal = ({ open, userDefaults, onDismiss, onApply }: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(false);
  const [isDefault, setIsDefault] = useState<boolean>(false);

  useEffect(() => {
    if (userDefaults) {
      setIsAllowPartialEnabled(userDefaults.allowPartialPayments);
      setIsDefault(true);
    }
  }, [userDefaults]);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentConditionsFormValue = {
      allowPartialPayments: isAllowPartialEnabled,
      isDefault: data.isDefaultChecked,
    };

    onApply(formData);

    return formData;
  };

  return (
    <CustomModal
      title="Payment conditions"
      open={open}
      enableUseAsDefault
      onDismiss={onDismiss}
      onApply={onApplyClicked}
      isDefault={isDefault}
    >
      <div className="py-1">
        <Checkbox label="Allow partial payments" value={isAllowPartialEnabled} onChange={setIsAllowPartialEnabled} />
      </div>
      <div className="ml-7 mt-1 text-greyText font-normal text-xs">
        Enable customers to pay a portion of the total amount owed, rather than the full balance all at once.
      </div>
    </CustomModal>
  );
};

export default PaymentConditionsModal;
