import PaymentMethodIcon from '../utils/PaymentMethodIcon';
import { format } from 'date-fns';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { LocalAddressType, LocalPaymentMethodTypes } from '../../../types/LocalEnums';

interface PaymentInfoRowProps {
  label: string;
  content?: (string | undefined)[];
  children?: React.ReactNode;
}

const PaymentInfoRow: React.FC<PaymentInfoRowProps> = ({ label, content, children }) => {
  return (
    <div className="text-sm/6 lg:flex">
      <span className="text-greyText font-medium lg:font-normal mb-1 lg:w-36 mr-4 block">{label}</span>

      {!children && content && content.length > 0 && (
        <div className="flex flex-col">
          {content
            .filter((x) => x)
            .map((value, index) => (
              <span key={`py-${index}`}>{value}</span>
            ))}
        </div>
      )}

      {children}
    </div>
  );
};

interface PaymentInfoProps extends LocalPaymentRequest {}

const PaymentInfo = ({ id, createdAt, paymentMethodTypes, addresses }: PaymentInfoProps) => {
  // Parsed date should follow the following format: Dec 22nd, 2022
  const formattedDate = format(createdAt, 'MMM do, yyyy');

  const paymentMethods = paymentMethodTypes;

  const isBankEnabled = paymentMethods.includes(LocalPaymentMethodTypes.Pisp);
  const isCardEnabled = paymentMethods.includes(LocalPaymentMethodTypes.Card);
  const isWalletEnabled =
    paymentMethods.includes(LocalPaymentMethodTypes.ApplePay) ||
    paymentMethods.includes(LocalPaymentMethodTypes.GooglePay);
  const isLightningEnabled = paymentMethods.includes(LocalPaymentMethodTypes.Lightning);

  const shippingAddresses = addresses?.filter((address) => address.addressType === LocalAddressType.Shipping);

  const shippingAddress = shippingAddresses?.length > 0 ? shippingAddresses[0] : undefined;

  return (
    <div className="space-y-5 lg:space-y-6">
      <PaymentInfoRow label="Payment request ID" content={[id]} />
      <PaymentInfoRow label="Created" content={[formattedDate]} />
      <PaymentInfoRow label="Payment methods">
        <div className="space-x-3">
          <PaymentMethodIcon paymentMethod="bank" enabled={isBankEnabled} />
          <PaymentMethodIcon paymentMethod="card" enabled={isCardEnabled} />
          <PaymentMethodIcon paymentMethod="wallet" enabled={isWalletEnabled} />
          <PaymentMethodIcon paymentMethod="lightning" enabled={isLightningEnabled} />
        </div>
      </PaymentInfoRow>

      {shippingAddress && (
        <PaymentInfoRow
          label="Shipping address"
          content={[
            shippingAddress?.addressLine1,
            shippingAddress?.addressLine2,

            // If address has City and County, display them as "{City}, {County}"
            // If address only has one of them, only display that value
            // If address has neither, display nothing
            `${
              shippingAddress?.addressCity && shippingAddress?.addressCounty
                ? `${shippingAddress?.addressCity}, County ${shippingAddress?.addressCounty}`
                : shippingAddress?.addressCity
                ? shippingAddress?.addressCity
                : shippingAddress?.addressCounty
                ? `County ${shippingAddress?.addressCounty}`
                : ''
            }`,

            // If address has Post Code and Country Code, display them as "{Post Code}, {Country Code}"
            // If address only has one of them, only display that value
            // If address has neither, display nothing
            `${
              shippingAddress?.addressPostCode && shippingAddress?.addressCountryCode
                ? `${shippingAddress?.addressPostCode}, ${shippingAddress?.addressCountryCode}`
                : shippingAddress?.addressPostCode
                ? shippingAddress?.addressPostCode
                : shippingAddress?.addressCountryCode
                ? shippingAddress?.addressCountryCode
                : ''
            }`,
            shippingAddress?.phone,
            shippingAddress?.email,
          ]}
        />
      )}
    </div>
  );
};

export default PaymentInfo;
