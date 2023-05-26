import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { LocalPaymentConditionsFormValue } from '../../../../types/LocalTypes';
import { UserPaymentDefaults } from '../../../../api/types/ApiResponses';

interface PaymentConditionsModalProps extends BaseModalProps {
  value: LocalPaymentConditionsFormValue;
  onApply: (data: LocalPaymentConditionsFormValue) => void;
}

const PaymentConditionsModal = ({ open, value, onDismiss, onApply }: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(value.allowPartialPayments);

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
      isDefault={value.isDefault}
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
