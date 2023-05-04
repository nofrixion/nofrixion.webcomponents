import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

interface PaymentConditionsModalProps extends BaseModalProps {
  onApply: (data: FormData) => void;
}

const PaymentConditionsModal = ({ open, onDismiss, onApply }: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(false);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: FormData = {
      ...data,
      isAllowPartialEnabled,
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

PaymentConditionsModal.componentProps = {
  label: String,
};

export default PaymentConditionsModal;