import BankIcon from '../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../assets/icons/card-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import BitcoinLightningIcon from '../../../assets/icons/bitcoin-icon.svg';

import BankDisabledIcon from '../../../assets/icons/bank-disabled.svg';
import CardDisabledIcon from '../../../assets/icons/card-disabled.svg';
import WalletDisabledIcon from '../../../assets/icons/wallet-disabled.svg';
import BitcoinDisabledIcon from '../../../assets/icons/bitcoin-disabled.svg';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

interface PaymentMethodIconProps {
  paymentMethod: 'bank' | 'card' | 'wallet' | 'lightning';
  showInfoTooltip?: boolean;
  enabled?: boolean;
}

const getIconDescription = (paymentMethodName: string, enabled: boolean) =>
  `${paymentMethodName} ${enabled ? 'enabled' : 'disabled'}`;

const paymentMethodIcons = {
  bank: BankIcon,
  card: CardIcon,
  wallet: WalletIcon,
  lightning: BitcoinLightningIcon,
};

const paymentMethodDisabledIcons = {
  bank: BankDisabledIcon,
  card: CardDisabledIcon,
  wallet: WalletDisabledIcon,
  lightning: BitcoinDisabledIcon,
};

const paymentMethodsName = {
  bank: 'Bank',
  card: 'Card',
  wallet: 'Apple Pay / Google Pay',
  lightning: 'Bitcoin Lightning',
};

const getImage: React.FC<PaymentMethodIconProps> = ({ paymentMethod, enabled = false }) => {
  return (
    <img
      src={enabled ? paymentMethodIcons[paymentMethod] : paymentMethodDisabledIcons[paymentMethod]}
      alt={getIconDescription(paymentMethodsName[paymentMethod], enabled)}
      className="w-6 h-6"
    />
  );
};

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({
  paymentMethod,
  showInfoTooltip = true,
  enabled = false,
}) => {
  if (!showInfoTooltip) {
    return getImage({ paymentMethod, enabled });
  }

  return (
    <InfoTooltip
      className="w-6 h-6 lg:w-4 lg:h-4"
      content={showInfoTooltip ? getIconDescription(paymentMethodsName[paymentMethod], enabled) : ''}
    >
      {getImage({ paymentMethod, enabled })}
    </InfoTooltip>
  );
};

export default PaymentMethodIcon;
