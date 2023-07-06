import UICreatePaymentRequestPage from '../../ui/CreatePaymentRequestPage/CreatePaymentRequestPage';

import { LocalPaymentRequest, LocalPaymentRequestCreate } from '../../../types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { PaymentRequestCreate, UserPaymentDefaults } from '../../../api/types/ApiResponses';
import { CardTokenCreateModes, PartialPaymentMethods } from '../../../api/types/Enums';
import { useBanks } from '../../../api/hooks/useBanks';
import { useUserPaymentDefaults } from '../../../api/hooks/useUserPaymentDefaults';
import { ClientSettingsClient } from '../../../api/clients/ClientSettingsClient';
import { defaultUserPaymentDefaults } from '../../../utils/constants';
import { remotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';

interface CreatePaymentRequesPageProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  merchantId: string; // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
  isOpen: boolean; // When true, the modal will be open. When false, the modal will be closed.
  onClose: () => void; // Callback function that will be called when the modal is asked to be closed.
  onUnauthorized: () => void; // Callback function that will be called when the user is unauthorized.
  onPaymentRequestCreated: (paymentRequest: LocalPaymentRequest) => void; // Callback function that will be called when the payment request is created.
}

const CreatePaymentRequestPage = ({
  token,
  merchantId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onClose,
  onUnauthorized,
  onPaymentRequestCreated,
}: CreatePaymentRequesPageProps) => {
  const paymentRequestClient = new PaymentRequestClient(apiUrl, token, merchantId, onUnauthorized);

  const { userPaymentDefaults, isUserPaymentDefaultsLoading } = useUserPaymentDefaults(apiUrl, token, onUnauthorized);
  const { banks } = useBanks(apiUrl, token, merchantId, onUnauthorized);

  const parseLocalPaymentRequestCreateToRemotePaymentRequest = (
    merchantId: string,
    paymentRequest: LocalPaymentRequestCreate,
  ): PaymentRequestCreate => {
    // None = 0,
    // card = 1,
    // pisp = 2,
    // lightning = 4,
    // cardtoken = 8,
    // applePay = 16
    // googlePay = 32

    let paymentMethodTypes = paymentRequest.paymentMethods.card.active ? 1 : 0;
    paymentMethodTypes += paymentRequest.paymentMethods.bank.active ? 2 : 0;
    paymentMethodTypes += paymentRequest.paymentMethods.lightning ? 4 : 0;
    paymentMethodTypes += paymentRequest.paymentMethods.wallet ? 16 + 32 : 0;

    return {
      merchantID: merchantId,
      title: paymentRequest.productOrService,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      paymentMethodTypes: paymentMethodTypes.toString(),
      description: paymentRequest.description,
      cardAuthorizeOnly: !paymentRequest.paymentMethods.card.captureFunds,
      customerEmailAddress: paymentRequest.email,
      cardCreateToken: false,
      cardTokenCreateModes: CardTokenCreateModes.None,
      partialPaymentMethod: paymentRequest.paymentConditions.allowPartialPayments
        ? PartialPaymentMethods.Partial
        : PartialPaymentMethods.None,
      priorityBankID: paymentRequest.paymentMethods.bank.active
        ? paymentRequest.paymentMethods.bank.priority?.id
        : undefined,
      shippingFirstName: paymentRequest.firstName,
      shippingLastName: paymentRequest.lastName,
      notificationEmailAddresses: paymentRequest.notificationEmailAddresses,
      useHostedPaymentPage: true,
    };
  };

  const onCreatePaymentRequest = async (paymentRequestToCreate: LocalPaymentRequestCreate) => {
    const parsedPaymentRequestToCreate = parseLocalPaymentRequestCreateToRemotePaymentRequest(
      merchantId,
      paymentRequestToCreate,
    );

    const response = await paymentRequestClient.create(parsedPaymentRequestToCreate);

    // TODO: Toasts are not working - however, we need to figure out how to handle errors & success cases
    // Maybe we should have a redirectUrl that we can redirect to? This could be a parameter in the web-component
    if (response.error) {
      makeToast('error', response.error.title);
      return;
    }

    makeToast('success', 'Payment request successfully created.');

    if (response.data) {
      onPaymentRequestCreated(remotePaymentRequestToLocalPaymentRequest(response.data));
    }
  };

  const onSaveUserPaymentDefaults = async (userPaymentDefaults: UserPaymentDefaults) => {
    const client = new ClientSettingsClient(apiUrl, token, onUnauthorized);
    const response = await client.saveUserPaymentDefaults(userPaymentDefaults);

    if (response.error) {
      makeToast('error', response.error.title);
      return;
    }
  };

  return (
    <>
      <UICreatePaymentRequestPage
        isOpen={isOpen}
        onClose={onClose}
        banks={banks ?? []}
        onConfirm={onCreatePaymentRequest}
        userPaymentDefaults={isUserPaymentDefaultsLoading ? defaultUserPaymentDefaults : userPaymentDefaults}
        onDefaultsChanged={onSaveUserPaymentDefaults}
        isUserPaymentDefaultsLoading={isUserPaymentDefaultsLoading}
      />
    </>
  );
};

export default CreatePaymentRequestPage;
