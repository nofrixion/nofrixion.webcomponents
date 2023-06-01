import { StoryFn, Meta } from '@storybook/react';

import CreatePaymentRequestPage from './CreatePaymentRequestPage';
import { Currency, PaymentProcessor } from '../../../api/types/Enums';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/CreatePaymentRequestPage',
  component: CreatePaymentRequestPage,
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onDefaultsChanged: { action: 'Defaults changed' },
    banks: {
      control: {
        type: 'array',
      },
    },
  },
} as Meta<typeof CreatePaymentRequestPage>;

const Template: StoryFn<typeof CreatePaymentRequestPage> = (args) => {
  let [isOpen, setIsOpen] = useState(true);

  const openScreen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const onCreatePaymentRequest = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openScreen}
          className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open create payment request page
        </button>
      </div>
      <CreatePaymentRequestPage {...args} isOpen={isOpen} onConfirm={onCreatePaymentRequest} onClose={onClose} />
    </>
  );
};

export const Showcase = Template.bind({});
Showcase.args = {
  isUserPaymentDefaultsLoading: false,
  banks: [
    {
      bankID: 'abddb9c0-6c43-4e87-8381-1bd1db2204ad',
      bankName: 'AIB Sandbox',
      order: 1,
      logo: 'aib.svg',
      currency: Currency.EUR,
      processor: PaymentProcessor.Plaid,
      personalInstitutionID: 'ins_116580',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: 'ef8dc304-c9cd-47f1-86a7-204740f73b22',
      bankName: 'AIB Sandbox',
      order: 2,
      logo: 'aib.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Yapily,
      personalInstitutionID: 'aibgb-sandbox',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: '4017acda-fb2c-4d79-8db9-370c2e57eb9a',
      bankName: 'Bank of Ireland Sandbox',
      order: 3,
      logo: 'bankofireland.svg',
      currency: Currency.EUR,
      processor: PaymentProcessor.Plaid,
      personalInstitutionID: 'ins_117710',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: 'becba420-af85-4f50-8693-4b1aee713d5d',
      bankName: 'Barclays Sandbox',
      order: 4,
      logo: 'barclays.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Yapily,
      personalInstitutionID: 'barclays-sandbox',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: '6e1d197d-cf35-40a1-8976-9a2f83a09586',
      bankName: 'Lloyds Bank Sandbox',
      order: 5,
      logo: 'lloyds.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Modulr,
      personalInstitutionID: 'H120000001',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: '72f05436-ac95-4d23-a51c-13a8867eaefd',
      bankName: 'Modelo Sandbox',
      order: 6,
      logo: 'modelo.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Yapily,
      personalInstitutionID: 'modelo-sandbox',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: 'b08cb2e5-754c-41c4-a96b-c1c172192f47',
      bankName: 'Natwest Bank Sandbox',
      order: 7,
      logo: 'natwest.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Yapily,
      personalInstitutionID: 'natwest-sandbox',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: 'faef567d-0772-4ac6-ad4b-b8b0ec09be55',
      bankName: 'Revolut EU Sandbox',
      order: 8,
      logo: 'revolut.svg',
      currency: Currency.EUR,
      processor: PaymentProcessor.Plaid,
      personalInstitutionID: 'ins_120274',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
    {
      bankID: '81e5a310-f0f7-4e3c-9aac-4ef43e25248c',
      bankName: 'Royal Bank of Scotland Sandbox',
      order: 9,
      logo: 'bos.svg',
      currency: Currency.GBP,
      processor: PaymentProcessor.Modulr,
      personalInstitutionID: 'H120000002',
      message: 'After pressing continue you will be redirected to your bank to complete your payment.',
    },
  ],
  userPaymentDefaults: {
    paymentMethodsDefaults: {
      pisp: true,
      pispPriorityBank: true,
      pispPriorityBankID: 'faef567d-0772-4ac6-ad4b-b8b0ec09be55',
      card: true,
      cardAuthorizeOnly: false,
      wallet: false,
      lightning: false,
    },
    paymentConditionsDefaults: {
      allowPartialPayments: false,
    },
  },
};
