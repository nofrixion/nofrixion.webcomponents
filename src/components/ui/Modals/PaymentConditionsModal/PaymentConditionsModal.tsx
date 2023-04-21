import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

interface PaymentConditionsModalProps extends BaseModalProps {
  onApply: (allowPartial: boolean) => void;
}

const PaymentConditionsModal = ({ open, onDismiss, onApply }: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(false);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = () => {
    onApply(isAllowPartialEnabled);
  };

  return (
    <CustomModal title="Payment conditions" open={open} onDismiss={onDismiss} onApply={onApplyClicked}>
      <div className="divide-y">
        <div className="py-1">
          <Checkbox label="Allow partial payments" value={isAllowPartialEnabled} onChange={setIsAllowPartialEnabled} />
        </div>
      </div>
      <div className="ml-7">
        <span className="text-greyText font-normal text-xs">
          Enable customers to pay a portion of the total amount owed, rather than the full balance all at once.
        </span>
      </div>
    </CustomModal>
  );
};

PaymentConditionsModal.componentProps = {
  label: String,
};

export default PaymentConditionsModal;
