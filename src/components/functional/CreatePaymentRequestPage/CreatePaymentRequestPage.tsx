import UICreatePaymentRequestPage from '../../ui/CreatePaymentRequestPage/CreatePaymentRequestPage';

import { LocalPaymentRequest, LocalPaymentRequestCreate } from '../../../types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import {
  PaymentRequestClient,
  PaymentRequestCreate,
  UserPaymentDefaults,
  useBanks,
  CardTokenCreateModes,
  PartialPaymentMethods,
  useUserPaymentDefaults,
  ClientSettingsClient,
  BankSettings,
} from '@nofrixion/moneymoov';

import { defaultUserPaymentDefaults } from '../../../utils/constants';
import { remotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface CreatePaymentRequesPageProps {
  token?: string; // Example: "eyJhbGciOiJIUz..."
  merchantId: string; // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
  isOpen: boolean; // When true, the modal will be open. When false, the modal will be closed.
  onClose: () => void; // Callback function that will be called when the modal is asked to be closed.
  onPaymentRequestCreated: (paymentRequest: LocalPaymentRequest) => void; // Callback function that will be called when the payment request is created.
  prefilledPaymentRequest?: LocalPaymentRequestCreate; // Optional payment request that will be prefilled in the form.
}

const CreatePaymentRequestPage = ({
  token,
  merchantId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onClose,
  onPaymentRequestCreated,
  prefilledPaymentRequest,
}: CreatePaymentRequesPageProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CreatePaymentRequestPageMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        isOpen={isOpen}
        onClose={onClose}
        onPaymentRequestCreated={onPaymentRequestCreated}
        prefilledPaymentRequest={prefilledPaymentRequest}
      />
    </QueryClientProvider>
  );
};

/**
 * This is the main component that will be rendered.
 */
const CreatePaymentRequestPageMain = ({
  token,
  merchantId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onClose,
  onPaymentRequestCreated,
  prefilledPaymentRequest,
}: CreatePaymentRequesPageProps) => {
  const paymentRequestClient = new PaymentRequestClient({
    apiUrl: apiUrl,
    authToken: token,
  });

  const { data: banksResponse, isLoading: isBanksLoading } = useBanks(
    { merchantId: merchantId },
    { apiUrl: apiUrl, authToken: token },
  );
  const [banks, setBanks] = useState<BankSettings[] | undefined>(undefined);
  const [userPaymentDefaults, setUserPaymentDefaults] = useState<UserPaymentDefaults | undefined>(undefined);

  const { data: userPaymentDefaultsResponse, isLoading: isUserPaymentDefaultsLoading } = useUserPaymentDefaults({
    apiUrl: apiUrl,
    authToken: token,
  });

  useEffect(() => {
    if (banksResponse?.status === 'success') {
      setBanks(banksResponse.data.payByBankSettings);
    } else if (banksResponse?.status === 'error') {
      console.warn(banksResponse.error);
    }
  }, [banksResponse]);

  useEffect(() => {
    if (userPaymentDefaultsResponse?.status === 'success') {
      setUserPaymentDefaults(userPaymentDefaultsResponse.data);
    } else if (userPaymentDefaultsResponse?.status === 'error') {
      console.warn(userPaymentDefaultsResponse.error);
    }
  }, [userPaymentDefaultsResponse]);

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
    if (response.status === 'error') {
      makeToast('error', response.error.title);
      return;
    }

    makeToast('success', 'Payment request successfully created.');

    if (response.data) {
      onPaymentRequestCreated(remotePaymentRequestToLocalPaymentRequest(response.data));
    }
  };

  const onSaveUserPaymentDefaults = async (userPaymentDefaults: UserPaymentDefaults) => {
    const client = new ClientSettingsClient({ apiUrl: apiUrl, authToken: token });
    const response = await client.saveUserPaymentDefaults(userPaymentDefaults);

    if (response.status === 'error') {
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
        prefilledData={prefilledPaymentRequest}
      />
    </>
  );
};

export default CreatePaymentRequestPage;
