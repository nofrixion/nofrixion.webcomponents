import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal';
import { useState } from 'react';
import { LocalPaymentNotificationsFormValue } from '../../../../types/LocalTypes';
import { NotificationEmailsDefaults } from '../../../../api/types/ApiResponses';
import InputTextField from '../../InputTextField/InputTextField';
import { AnimatePresence } from 'framer-motion';
import AnimateHeightWrapper from '../../utils/AnimateHeight';

interface NotificationEmailsModalProps extends BaseModalProps {
  userDefaults?: NotificationEmailsDefaults;
  onApply: (data: LocalPaymentNotificationsFormValue) => void;
}

const NotificationEmailsModal = ({ open, userDefaults, onDismiss, onApply }: NotificationEmailsModalProps) => {
  const [isDefault, setIsDefault] = useState<boolean>(userDefaults ? true : false);
  const [email, setEmail] = useState(userDefaults ? userDefaults.emailAddresses : '');
  const [hasEmailError, setHasEmailError] = useState(false);

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentNotificationsFormValue = {
      emailAddresses: email,
      isDefault: data.isDefaultChecked,
    };

    onApply(formData);

    return formData;
  };

  const onValidateEmail = (email: string) => {
    if (email && !validateEmail(email)) {
      setHasEmailError(true);
    }

    if (!email) {
      setHasEmailError(false);
    }

    if (email && validateEmail(email)) {
      setHasEmailError(false);
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <CustomModal
      title="Payment notifications"
      open={open}
      enableUseAsDefault
      onDismiss={onDismiss}
      onApply={onApplyClicked}
      isDefault={isDefault}
    >
      <div className="text-defaultText font-normal text-sm mb-12">
        When the payment is done, an email notification will be sent to the following email addresses.
      </div>
      <div>
        <InputTextField
          label="Email address"
          autoComplete="email"
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            if (hasEmailError) {
              onValidateEmail(e.target.value);
            }
          }}
          onBlur={(e) => onValidateEmail(e.target.value)}
        />

        <AnimatePresence>
          {hasEmailError && (
            <AnimateHeightWrapper layoutId="email-error">
              <div className="mt-2 bg-[#FCF5CF] text-sm p-3 w-fill rounded">Make sure the email address is valid.</div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-2 text-greyText font-normal text-xs">To include more than one separate them with a comma.</div>
    </CustomModal>
  );
};

export default NotificationEmailsModal;
