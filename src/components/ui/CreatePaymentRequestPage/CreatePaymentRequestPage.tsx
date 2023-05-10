import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import InputAmountField from '../InputAmountField/InputAmountField';
import InputTextField from '../InputTextField/InputTextField';
import EditOptionCard from '../EditOptionCard/EditOptionCard';

import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
import NextIcon from '../../../assets/icons/next-icon.svg';
import InputTextAreaField from '../InputTextAreaField/InputTextAreaField';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import AnimateHeightWrapper from '../utils/AnimateHeight';
import PaymentMethodsModal from '../Modals/PaymentMethodsModal/PaymentMethodsModal';
import { Currency } from '../../../api/types/Enums';
import {
  LocalPaymentConditionsFormValue,
  LocalPaymentMethodsFormValue,
  LocalPaymentRequestCreate,
} from '../../../api/types/LocalTypes';
import classNames from 'classnames';
import PaymentConditionsModal from '../Modals/PaymentConditionsModal/PaymentConditionsModal';

import BankIcon from '../../../assets/icons/bank-icon.svg';
import CardIcon from '../../../assets/icons/card-icon.svg';
import WalletIcon from '../../../assets/icons/wallet-icon.svg';
import BitcoinLightningIcon from '../../../assets/icons/bitcoin-icon.svg';

import BankDisabledIcon from '../../../assets/icons/bank-disabled.svg';
import CardDisabledIcon from '../../../assets/icons/card-disabled.svg';
import WalletDisabledIcon from '../../../assets/icons/wallet-disabled.svg';
import BitcoinDisabledIcon from '../../../assets/icons/bitcoin-disabled.svg';
import { parseBoldText } from '../../../utils/uiFormaters';
import { BankSettings } from '../../../api/types/ApiResponses';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

interface CreatePaymentRequestPageProps {
  banks: BankSettings[];
  onConfirm: (data: LocalPaymentRequestCreate) => void;
}

const CreatePaymentRequestPage = ({ banks, onConfirm }: CreatePaymentRequestPageProps) => {
  let [isOpen, setIsOpen] = useState(true);

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('EUR');
  const [productOrService, setProductOrService] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [paymentMethodsFormValue, setPaymentMethodsFormValue] = useState<LocalPaymentMethodsFormValue>({
    isBankEnabled: true,
    isCardEnabled: true,
    isWalletEnabled: true,
    isLightningEnabled: false,
    isCaptureFundsEnabled: true,
  });

  const [paymentConditionsFormValue, setPaymentConditionsFormValue] = useState<LocalPaymentConditionsFormValue>({
    allowPartialPayments: false,
  });

  const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] = useState(false);
  const [isPaymentConditionsModalOpen, setIsPaymentConditionsModalOpen] = useState(false);

  const [isReviewing, setIsReviewing] = useState(false);

  const onCurrencyChange = (currency: string) => {
    setCurrency(currency as 'EUR' | 'GBP');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onMethodsReceived = (data: LocalPaymentMethodsFormValue) => {
    setIsPaymentMethodsModalOpen(false);

    setPaymentMethodsFormValue(data);
  };

  const onConditionsReceived = (data: LocalPaymentConditionsFormValue) => {
    setIsPaymentConditionsModalOpen(false);

    setPaymentConditionsFormValue(data);
  };

  const onReviewClicked = () => {
    setIsReviewing(true);
  };

  const onConfrimClicked = () => {
    const paymentRequestToCreate: LocalPaymentRequestCreate = {
      amount: parseInt(amount),
      currency: currency as Currency,
      productOrService,
      description,
      firstName,
      lastName,
      email,
      paymentConditions: {
        allowPartialPayments: false,
      },
      paymentMethods: {
        bank: {
          active: paymentMethodsFormValue.isBankEnabled,
          priority: paymentMethodsFormValue.priorityBank,
        },
        card: {
          active: paymentMethodsFormValue.isCardEnabled,
          captureFunds: paymentMethodsFormValue.isCaptureFundsEnabled,
        },
        wallet: paymentMethodsFormValue.isWalletEnabled,
        lightning: paymentMethodsFormValue.isLightningEnabled,
      },
    };

    onConfirm(paymentRequestToCreate);

    // TODO: Remove this. This is just for demo purposes
    closeModal();
    resetStates();
  };

  const resetStates = () => {
    setAmount('');
    setCurrency('EUR');
    setProductOrService('');
    setDescription('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPaymentMethodsFormValue({
      isBankEnabled: true,
      isCardEnabled: true,
      isWalletEnabled: true,
      isLightningEnabled: false,
      isCaptureFundsEnabled: true,
    });
    setPaymentConditionsFormValue({
      allowPartialPayments: false,
    });
    setIsReviewing(false);
  };

  const availableMethodsDetails = [
    ...(paymentMethodsFormValue.isBankEnabled && paymentMethodsFormValue.priorityBank
      ? [`*${paymentMethodsFormValue.priorityBank.name}* set up as priority bank.`]
      : []),
    ...(!paymentMethodsFormValue.isCaptureFundsEnabled ? ["Don't capture funds on cards is on."] : []),
  ];

  const getIconDescription = (paymentMethodName: string, enabled: boolean) =>
    `${paymentMethodName} ${enabled ? 'enabled' : 'disabled'}`;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open create payment request page
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={() => {}}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform bg-white text-left align-middle transition-all min-h-screen flex">
                  <AnimatePresence initial={false}>
                    {!isReviewing && (
                      <motion.div
                        className="w-1/2 overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '50%' }}
                        exit={{ opacity: 0, width: 0, flex: 0 }}
                      >
                        {/* Left side */}
                        <ScrollArea.Root className="w-full h-screen overflow-hidden">
                          <ScrollArea.Viewport className="w-full h-full">
                            <div className="pt-20 pb-28">
                              <div className="flex items-center">
                                <button className="inline-block ml-[3.25rem]" onClick={closeModal}>
                                  <img
                                    src={BackButtonIcon}
                                    alt="Back button"
                                    className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem]"
                                  />
                                </button>
                                <Dialog.Title
                                  as="h3"
                                  className="text-[1.75rem]/8 font-semibold inline-block ml-[2.875rem] text-clip whitespace-nowrap"
                                >
                                  New payment request
                                </Dialog.Title>
                              </div>
                              <div className="mt-14 ml-32 pr-10">
                                <InputAmountField
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  onCurrencyChange={onCurrencyChange}
                                  currency={currency}
                                />

                                <div className="mt-11">
                                  <InputTextField
                                    label="Product or service"
                                    maxLength={40}
                                    value={productOrService}
                                    onChange={(e) => setProductOrService(e.target.value)}
                                  />
                                </div>

                                <div className="mt-[3.75rem]">
                                  <InputTextAreaField
                                    label="Description"
                                    maxLength={140}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    optional
                                  />
                                </div>

                                <div className="mt-6">
                                  <InputTextField
                                    label="First name"
                                    autoComplete="given-name"
                                    optional
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                  />
                                </div>

                                <div className="mt-10">
                                  <InputTextField
                                    label="Last name"
                                    autoComplete="family-name"
                                    optional
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                  />
                                </div>

                                <div className="mt-11">
                                  <InputTextField
                                    label="Email"
                                    autoComplete="email"
                                    optional
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>

                                <div className="mt-14">
                                  <h4 className="text-lg/6 font-semibold mb-6">Settings</h4>
                                  <div className="w-[27rem] space-y-2">
                                    <EditOptionCard
                                      label="Payment conditions"
                                      value={
                                        !paymentConditionsFormValue.allowPartialPayments
                                          ? 'Single full payment'
                                          : 'Partial payments'
                                      }
                                      onClick={() => {
                                        setIsPaymentConditionsModalOpen(true);
                                      }}
                                    />
                                    <EditOptionCard
                                      label="Payment methods"
                                      details={availableMethodsDetails}
                                      onClick={() => {
                                        setIsPaymentMethodsModalOpen(true);
                                      }}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <img
                                          src={paymentMethodsFormValue.isBankEnabled ? BankIcon : BankDisabledIcon}
                                          alt="Bank"
                                          className="w-6 h-6"
                                        />
                                        <img
                                          src={paymentMethodsFormValue.isCardEnabled ? CardIcon : CardDisabledIcon}
                                          alt="Card"
                                          className="w-6 h-6"
                                        />
                                        <img
                                          src={
                                            paymentMethodsFormValue.isWalletEnabled ? WalletIcon : WalletDisabledIcon
                                          }
                                          alt="Apple Pay"
                                          className="w-6 h-6"
                                        />
                                        <img
                                          src={
                                            paymentMethodsFormValue.isLightningEnabled
                                              ? BitcoinLightningIcon
                                              : BitcoinDisabledIcon
                                          }
                                          alt="Bitcoin"
                                          className="w-6 h-6"
                                        />
                                      </div>
                                    </EditOptionCard>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ScrollArea.Viewport>
                          <ScrollArea.Scrollbar
                            className="flex select-none touch-none p-0.5 bg-black bg-opacity-10 transition-colors duration-[160ms] ease-out hover:bg-opacity-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                            orientation="vertical"
                          >
                            <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                          </ScrollArea.Scrollbar>
                          <ScrollArea.Scrollbar
                            className="flex select-none touch-none p-0.5 bg-black bg-opacity-10 transition-colors duration-[160ms] ease-out hover:bg-opacity-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                            orientation="horizontal"
                          >
                            <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                          </ScrollArea.Scrollbar>
                          <ScrollArea.Corner className="bg-opacity-25" />
                        </ScrollArea.Root>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right side */}
                  <div className="flex-1 bg-mainGrey min-h-screen pl-[8.25rem] pr-32 py-44">
                    <div className="w-full max-w-lg mx-auto">
                      <div className="space-y-10">
                        {/* Amount */}
                        <AnimatePresence>
                          {currency && amount && (
                            <AnimateHeightWrapper layoutId="amount">
                              <div className="flex overflow-hidden">
                                <span className="leading-6 text-greyText w-1/2">Request</span>
                                <span className="font-semibold text-[2rem]/8 w-1/2">
                                  {currency == 'GBP' ? '£' : '€'} {amount}
                                </span>
                              </div>
                            </AnimateHeightWrapper>
                          )}
                        </AnimatePresence>

                        {/* For */}
                        <AnimatePresence>
                          {(productOrService || description) && (
                            <AnimateHeightWrapper layoutId="product-or-service-wrapper">
                              <div className="flex">
                                <motion.span layout="position" className="leading-6 text-greyText w-1/2">
                                  For
                                </motion.span>

                                <div className="flex flex-col w-1/2">
                                  <AnimatePresence>
                                    {productOrService && (
                                      <AnimateHeightWrapper layoutId="product-or-service">
                                        <motion.p
                                          layout="position"
                                          className="font-semibold w-[17.5rem] break-words text-lg/5 mb-2"
                                        >
                                          {productOrService}
                                        </motion.p>
                                      </AnimateHeightWrapper>
                                    )}
                                  </AnimatePresence>

                                  <AnimatePresence>
                                    {description && (
                                      <AnimateHeightWrapper layoutId="description">
                                        <motion.p
                                          layout="position"
                                          className="text-sm/5 max-w-[17.5rem] w-full text-ellipsis break-words"
                                        >
                                          {description}
                                        </motion.p>
                                      </AnimateHeightWrapper>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </AnimateHeightWrapper>
                          )}
                        </AnimatePresence>

                        {/* From */}
                        <AnimatePresence>
                          {(firstName || lastName || email) && (
                            <AnimateHeightWrapper layoutId="from">
                              <div className="flex">
                                {(firstName || lastName || email) && (
                                  <span className="leading-6 text-greyText w-1/2">From</span>
                                )}

                                <div className="flex flex-col w-1/2">
                                  <AnimatePresence>
                                    {(firstName || lastName) && (
                                      <AnimateHeightWrapper layoutId="name">
                                        <p className="font-semibold text-lg/5 mb-2">
                                          {firstName} {lastName}
                                        </p>
                                      </AnimateHeightWrapper>
                                    )}
                                  </AnimatePresence>
                                  <AnimatePresence>
                                    {email && (
                                      <AnimateHeightWrapper layoutId="email">
                                        <p className="text-sm/5">{email}</p>
                                      </AnimateHeightWrapper>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </AnimateHeightWrapper>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Settings */}
                      <AnimatePresence>
                        {isReviewing && (
                          <motion.div
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                          >
                            <div className="h-px w-full bg-borderGrey mt-12"></div>
                            <div className="flex overflow-hidden mt-12">
                              <span className="leading-6 text-greyText w-1/2">Settings</span>
                              <div className="flex flex-col w-1/2 space-y-6">
                                <span className="text-sm/6">Single full payment.</span>

                                <div className="flex items-center space-x-3">
                                  <InfoTooltip
                                    content={getIconDescription('Bank', paymentMethodsFormValue.isBankEnabled)}
                                  >
                                    <img
                                      src={paymentMethodsFormValue.isBankEnabled ? BankIcon : BankDisabledIcon}
                                      alt="Bank"
                                      className="w-6 h-6"
                                    />
                                  </InfoTooltip>
                                  <InfoTooltip
                                    content={getIconDescription('Card', paymentMethodsFormValue.isCardEnabled)}
                                  >
                                    <img
                                      src={paymentMethodsFormValue.isCardEnabled ? CardIcon : CardDisabledIcon}
                                      alt="Card"
                                      className="w-6 h-6"
                                    />
                                  </InfoTooltip>
                                  <InfoTooltip
                                    content={getIconDescription(
                                      'Apple Pay / Google Pay',
                                      paymentMethodsFormValue.isWalletEnabled,
                                    )}
                                  >
                                    <img
                                      src={paymentMethodsFormValue.isWalletEnabled ? WalletIcon : WalletDisabledIcon}
                                      alt="Apple Pay"
                                      className="w-6 h-6"
                                    />
                                  </InfoTooltip>
                                  <InfoTooltip
                                    content={getIconDescription(
                                      'Bitcoin Lightning',
                                      paymentMethodsFormValue.isLightningEnabled,
                                    )}
                                  >
                                    <img
                                      src={
                                        paymentMethodsFormValue.isLightningEnabled
                                          ? BitcoinLightningIcon
                                          : BitcoinDisabledIcon
                                      }
                                      alt="Bitcoin Lightning"
                                      className="w-6 h-6"
                                    />
                                  </InfoTooltip>
                                </div>

                                {availableMethodsDetails.length > 0 && (
                                  <div className="flex flex-col text-greyText text-xs">
                                    {availableMethodsDetails?.map((detail, index) => {
                                      return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Buttons */}
                      <AnimatePresence>
                        {currency && amount && productOrService && (
                          <motion.div
                            className="flex h-12 !mt-20 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {/* Edit button */}
                            {isReviewing && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-52 py-3 bg-[#DEE5ED] rounded-full mr-5"
                                onClick={() => setIsReviewing(false)}
                              >
                                Edit
                              </motion.button>
                            )}

                            {/* Review PR */}
                            {!isReviewing && (
                              <motion.button
                                type="button"
                                className="w-full px-16 whitespace-nowrap flex justify-center items-center rounded-full bg-[#006A80] py-3 text-sm text-white font-semibold cursor-pointer hover:bg-[#144752]"
                                onClick={onReviewClicked}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <span className="py-3">Review payment request</span>

                                <img
                                  src={NextIcon}
                                  alt="Arrow right"
                                  className="ml-2 w-6 h-6 min-w-[1.5rem] min-h-[1.5rem]"
                                />
                              </motion.button>
                            )}

                            {/* Confirm PR */}
                            <AnimatePresence>
                              {isReviewing && (
                                <motion.button
                                  type="button"
                                  className="w-72 whitespace-nowrap flex justify-center items-center rounded-full bg-[#006A80] py-3 text-sm text-white font-semibold cursor-pointer hover:bg-[#144752]"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{}}
                                  onClick={onConfrimClicked}
                                >
                                  <span className="py-3">Confirm payment request</span>
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          <PaymentMethodsModal
            open={isPaymentMethodsModalOpen}
            value={paymentMethodsFormValue}
            onApply={onMethodsReceived}
            onDismiss={() => {}}
            banks={banks}
          />

          <PaymentConditionsModal
            open={isPaymentConditionsModalOpen}
            onDismiss={() => {}}
            onApply={onConditionsReceived}
          />
        </Dialog>
      </Transition>
    </>
  );
};

export default CreatePaymentRequestPage;
