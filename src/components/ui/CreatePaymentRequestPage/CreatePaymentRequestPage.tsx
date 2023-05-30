import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputAmountField from '../InputAmountField/InputAmountField';
import InputTextField from '../InputTextField/InputTextField';
import EditOptionCard from '../EditOptionCard/EditOptionCard';

import AlertIcon from '../../../assets/icons/alert-icon.svg';
import NextIcon from '../../../assets/icons/next-icon.svg';
import InputTextAreaField from '../InputTextAreaField/InputTextAreaField';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateHeightWrapper from '../utils/AnimateHeight';
import LayoutWrapper from '../utils/LayoutWrapper';
import PaymentMethodsModal from '../Modals/PaymentMethodsModal/PaymentMethodsModal';
import { Currency } from '../../../api/types/Enums';
import {
  LocalPaymentConditionsFormValue,
  LocalPaymentMethodsFormValue,
  LocalPaymentRequestCreate,
} from '../../../types/LocalTypes';
import classNames from 'classnames';
import PaymentConditionsModal from '../Modals/PaymentConditionsModal/PaymentConditionsModal';

import { parseBoldText } from '../../../utils/uiFormaters';
import { BankSettings, UserPaymentDefaults } from '../../../api/types/ApiResponses';
import PaymentMethodIcon from '../utils/PaymentMethodIcon';
import _ from 'lodash';

interface CreatePaymentRequestPageProps {
  banks: BankSettings[];
  userPaymentDefaults: UserPaymentDefaults;
  onConfirm: (data: LocalPaymentRequestCreate) => void;
  isOpen: boolean;
  onClose: () => void;
  onDefaultsChanged: (data: UserPaymentDefaults) => void;
}

const durationAnimationWidth = 0.3;

const CreatePaymentRequestPage = ({
  banks,
  userPaymentDefaults,
  onConfirm,
  isOpen,
  onClose,
  onDefaultsChanged,
}: CreatePaymentRequestPageProps) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('EUR');
  const [productOrService, setProductOrService] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [defaultsChanged, setDefaultsChanged] = useState(false);

  const [paymentMethodsFormValue, setPaymentMethodsFormValue] = useState<LocalPaymentMethodsFormValue>({
    isBankEnabled: true,
    isCardEnabled: true,
    isWalletEnabled: true,
    isLightningEnabled: false,
    isCaptureFundsEnabled: true,
    isDefault: false,
  });

  useEffect(() => {
    if (userPaymentDefaults) {
      if (userPaymentDefaults.paymentMethodsDefaults) {
        const defaults: LocalPaymentMethodsFormValue = {
          isBankEnabled: userPaymentDefaults.paymentMethodsDefaults.pisp,
          isCardEnabled: userPaymentDefaults.paymentMethodsDefaults.card,
          isWalletEnabled: userPaymentDefaults.paymentMethodsDefaults.wallet,
          isLightningEnabled: userPaymentDefaults.paymentMethodsDefaults.lightning,
          isCaptureFundsEnabled: !userPaymentDefaults.paymentMethodsDefaults.cardAuthorizeOnly,
          priorityBank: undefined,
          isDefault: true,
        };

        if (userPaymentDefaults.paymentMethodsDefaults.pispPriorityBankID) {
          const bank = banks.find((b) => b.bankID === userPaymentDefaults.paymentMethodsDefaults?.pispPriorityBankID);
          if (bank) {
            defaults.priorityBank = { id: bank.bankID, name: bank.bankName };
          }
        }

        setPaymentMethodsFormValue(defaults);
      }

      if (userPaymentDefaults.paymentConditionsDefaults) {
        setPaymentConditionsFormValue({
          allowPartialPayments: userPaymentDefaults.paymentConditionsDefaults.allowPartialPayments,
          isDefault: true,
        });
      }
    }
  }, [userPaymentDefaults]);

  // If paymentConditionsDefaults is defined then use them. Otherwise set the default values
  const [paymentConditionsFormValue, setPaymentConditionsFormValue] = useState<LocalPaymentConditionsFormValue>({
    allowPartialPayments: false,
    isDefault: false,
  });

  const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] = useState(false);
  const [isPaymentConditionsModalOpen, setIsPaymentConditionsModalOpen] = useState(false);

  const [isReviewing, setIsReviewing] = useState(false);

  const onCurrencyChange = (currency: string) => {
    setCurrency(currency as 'EUR' | 'GBP');
  };

  const onMethodsReceived = (data: LocalPaymentMethodsFormValue) => {
    setIsPaymentMethodsModalOpen(false);

    setPaymentMethodsFormValue(data);

    // Since there's no way to cancel the modal, we need to check if the data has changed
    if (!_.isEqual(data, paymentMethodsFormValue)) {
      setDefaultsChanged(true);
    }
  };

  const onConditionsReceived = (data: LocalPaymentConditionsFormValue) => {
    setIsPaymentConditionsModalOpen(false);

    setPaymentConditionsFormValue(data);

    // Since there's no way to cancel the modal, we need to check if the data has changed
    if (!_.isEqual(data, paymentConditionsFormValue)) {
      setDefaultsChanged(true);
    }
  };

  const onReviewClicked = () => {
    if (email && !validateEmail(email)) {
      return;
    }

    setIsReviewing(true);
  };

  const onConfrimClicked = () => {
    const paymentRequestToCreate: LocalPaymentRequestCreate = {
      amount: Number(amount),
      currency: currency as Currency,
      productOrService,
      description,
      firstName,
      lastName,
      email,
      paymentConditions: {
        allowPartialPayments: paymentConditionsFormValue.allowPartialPayments,
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

    if (defaultsChanged) {
      handleDefaultsChanged();
    }

    // TODO: Remove this. This is just for demo purposes
    onClose();
    resetStates();
  };

  const handleDefaultsChanged = () => {
    const defaults: UserPaymentDefaults = {};

    if (paymentMethodsFormValue.isDefault) {
      defaults.paymentMethodsDefaults = {
        pisp: paymentMethodsFormValue.isBankEnabled,
        card: paymentMethodsFormValue.isCardEnabled,
        wallet: paymentMethodsFormValue.isWalletEnabled,
        lightning: paymentMethodsFormValue.isLightningEnabled,
        cardAuthorizeOnly: !paymentMethodsFormValue.isCaptureFundsEnabled,
        pispPriorityBank: paymentMethodsFormValue.priorityBank ? true : false,
        pispPriorityBankID: paymentMethodsFormValue.priorityBank?.id ?? '',
      };
    } else {
      defaults.paymentMethodsDefaults = undefined;
    }

    if (paymentConditionsFormValue.isDefault) {
      defaults.paymentConditionsDefaults = {
        allowPartialPayments: paymentConditionsFormValue.allowPartialPayments,
      };
    } else {
      defaults.paymentConditionsDefaults = undefined;
    }

    onDefaultsChanged(defaults);
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
      isDefault: false,
    });
    setPaymentConditionsFormValue({
      allowPartialPayments: false,
      isDefault: false,
    });
    setIsReviewing(false);
  };

  const availableMethodsDetails = [
    ...(paymentMethodsFormValue.isBankEnabled && paymentMethodsFormValue.priorityBank
      ? [`*${paymentMethodsFormValue.priorityBank.name}* set up as priority bank.`]
      : []),
    ...(!paymentMethodsFormValue.isCaptureFundsEnabled ? ["Don't capture funds on cards is on."] : []),
  ];

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

  const getIconDescription = (paymentMethodName: string, enabled: boolean) =>
    `${paymentMethodName} ${enabled ? 'enabled' : 'disabled'}`;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative font-inter text-defaultText" onClose={() => {}}>
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
                  {/* Left side */}
                  <AnimatePresence initial={false}>
                    {!isReviewing && (
                      <motion.div
                        initial={{ opacity: 0, width: '0' }}
                        animate={{ opacity: 1, width: '50%', transition: { duration: durationAnimationWidth } }}
                        exit={{ opacity: 0, width: 0, flex: 0, transition: { duration: durationAnimationWidth } }}
                      >
                        <div className="w-full pt-20 pb-28">
                          <div className="flex items-center">
                            <button className="inline-block ml-[3.25rem]" onClick={onClose}>
                              <svg
                                className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] transition stroke-controlGrey hover:stroke-controlGreyHover"
                                width="26"
                                height="22"
                                viewBox="0 0 26 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11 21L1 11L11 1" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 11.082H25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <Dialog.Title
                              as="h3"
                              className="text-[1.75rem]/8 font-semibold inline-block ml-[2.875rem] text-clip whitespace-nowrap"
                            >
                              New payment request
                            </Dialog.Title>
                          </div>
                          <div className="ml-[7.625rem] space-y-10 w-[27rem]">
                            <div className="w-[13.938rem] mt-8">
                              <InputAmountField
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onCurrencyChange={onCurrencyChange}
                                currency={currency}
                              />
                            </div>

                            <div>
                              <InputTextField
                                label="Product or service"
                                maxLength={40}
                                value={productOrService}
                                onChange={(e) => setProductOrService(e.target.value)}
                                required
                              />
                            </div>

                            <div>
                              <InputTextAreaField
                                label="Description"
                                maxLength={140}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>

                            <div>
                              <InputTextField
                                label="First name"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>

                            <div>
                              <InputTextField
                                label="Last name"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>

                            <div>
                              <InputTextField
                                label="Email"
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
                                    <div className="mt-2 bg-[#FCF5CF] text-sm p-3 w-[27rem] rounded">
                                      Make sure the email address is valid.
                                    </div>
                                  </AnimateHeightWrapper>
                                )}
                              </AnimatePresence>
                            </div>

                            <div>
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
                                    <PaymentMethodIcon
                                      showInfoTooltip={false}
                                      paymentMethod="bank"
                                      enabled={paymentMethodsFormValue.isBankEnabled}
                                    />
                                    <PaymentMethodIcon
                                      showInfoTooltip={false}
                                      paymentMethod="card"
                                      enabled={paymentMethodsFormValue.isCardEnabled}
                                    />
                                    <PaymentMethodIcon
                                      showInfoTooltip={false}
                                      paymentMethod="wallet"
                                      enabled={paymentMethodsFormValue.isWalletEnabled}
                                    />
                                    <PaymentMethodIcon
                                      showInfoTooltip={false}
                                      paymentMethod="lightning"
                                      enabled={paymentMethodsFormValue.isLightningEnabled}
                                    />
                                  </div>
                                </EditOptionCard>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right side */}
                  <div className="flex-1 bg-mainGrey sticky inset-0 h-screen pl-[8.25rem] pr-32 py-44">
                    <div className="w-full max-w-lg mx-auto">
                      <div className="space-y-10">
                        <AnimatePresence>
                          {/* Amount */}
                          {currency && amount && (
                            <LayoutWrapper key="amount" className="flex overflow-hidden items-baseline">
                              <span className="leading-6 text-greyText w-40 shrink-0">Request</span>
                              <span className="font-semibold text-[2rem]/8 w-full">
                                {currency == 'GBP' ? '£' : '€'} {amount}
                              </span>
                            </LayoutWrapper>
                          )}

                          {/* Product or service + description */}
                          {(productOrService || description) && (
                            <LayoutWrapper key="product-or-service-wrapper" className="flex items-baseline">
                              <span className="leading-6 text-greyText w-40 shrink-0">For</span>

                              <div className="flex flex-col w-full">
                                {productOrService && (
                                  <LayoutWrapper key="product-or-service">
                                    <p className="font-semibold w-full break-words text-lg/5 mb-2">
                                      {productOrService}
                                    </p>
                                  </LayoutWrapper>
                                )}

                                {description && (
                                  <LayoutWrapper key="description">
                                    <p className="text-sm/5 w-full text-ellipsis break-words">{description}</p>
                                  </LayoutWrapper>
                                )}
                              </div>
                            </LayoutWrapper>
                          )}

                          {/* Name */}
                          {(firstName || lastName || email) && (
                            <LayoutWrapper key="from" className="flex items-baseline">
                              <span className="leading-6 text-greyText w-40 shrink-0 break-words">From</span>

                              <div className="flex flex-col w-full">
                                {(firstName || lastName) && (
                                  <motion.p layout="position" className="font-semibold text-lg/5 mb-2 break-words">
                                    {firstName} {lastName}
                                  </motion.p>
                                )}

                                {email && (
                                  <motion.div
                                    layout="position"
                                    className={classNames('flex items-center w-fit', {
                                      'p-1 bg-[#FCF5CF]': hasEmailError,
                                    })}
                                  >
                                    <p className="text-sm/5 break-words">{email}</p>
                                    {hasEmailError && <img src={AlertIcon} alt="Alert icon" className="w-4 h-4 ml-2" />}
                                  </motion.div>
                                )}
                              </div>
                            </LayoutWrapper>
                          )}

                          {/* Settings */}
                          {isReviewing && (
                            <LayoutWrapper key="settings" animateOnExit={false} duration={0.6}>
                              <div className="h-px w-full bg-borderGrey mt-12"></div>
                              <div className="flex overflow-hidden mt-12 items-baseline">
                                <span className="leading-6 text-greyText w-40 shrink-0">Settings</span>
                                <div className="flex flex-col w-full space-y-6">
                                  <span className="text-sm/6">Single full payment.</span>

                                  <div className="flex items-center space-x-3">
                                    <PaymentMethodIcon
                                      paymentMethod="bank"
                                      enabled={paymentMethodsFormValue.isBankEnabled}
                                    />
                                    <PaymentMethodIcon
                                      paymentMethod="card"
                                      enabled={paymentMethodsFormValue.isCardEnabled}
                                    />
                                    <PaymentMethodIcon
                                      paymentMethod="wallet"
                                      enabled={paymentMethodsFormValue.isWalletEnabled}
                                    />
                                    <PaymentMethodIcon
                                      paymentMethod="lightning"
                                      enabled={paymentMethodsFormValue.isLightningEnabled}
                                    />
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
                            </LayoutWrapper>
                          )}

                          {/* Buttons */}
                          {currency && amount && productOrService && (
                            <LayoutWrapper key="buttons" className="flex flex-col !mt-20 justify-center">
                              <AnimatePresence initial={false}>
                                {/* Review PR */}
                                {!isReviewing && (
                                  <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: durationAnimationWidth / 1.5 }}
                                    key="review-pr"
                                    type="button"
                                    className="w-full h-12 px-16 whitespace-nowrap flex justify-center items-center rounded-full py-3 text-sm cursor-pointer bg-[#DEE5ED] transition hover:bg-[#BDCCDB]"
                                    onClick={onReviewClicked}
                                  >
                                    <span className="py-3">Review payment request</span>

                                    <img src={NextIcon} alt="Arrow right" className="ml-2 w-4 h-4" />
                                  </motion.button>
                                )}

                                {/* Confirm PR */}
                                {isReviewing && (
                                  <LayoutWrapper
                                    layout={false}
                                    className="space-y-7"
                                    animateOnExit={false}
                                    duration={0.6}
                                    delay={durationAnimationWidth / 1.5}
                                  >
                                    <button
                                      className="w-full whitespace-nowrap flex justify-center items-center rounded-full bg-[#006A80] py-3 text-white font-semibold cursor-pointer hover:bg-[#144752]"
                                      onClick={onConfrimClicked}
                                    >
                                      Confirm payment request
                                    </button>

                                    {/* Edit button */}
                                    <button
                                      className="w-full py-3 bg-[#DEE5ED] transition hover:bg-[#BDCCDB] rounded-full mr-5"
                                      onClick={() => setIsReviewing(false)}
                                    >
                                      Edit
                                    </button>
                                  </LayoutWrapper>
                                )}
                              </AnimatePresence>
                            </LayoutWrapper>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          <PaymentMethodsModal
            open={isPaymentMethodsModalOpen}
            userDefaults={userPaymentDefaults?.paymentMethodsDefaults}
            onApply={onMethodsReceived}
            onDismiss={() => {}}
            banks={banks}
          />

          <PaymentConditionsModal
            open={isPaymentConditionsModalOpen}
            userDefaults={userPaymentDefaults?.paymentConditionsDefaults}
            onDismiss={() => {}}
            onApply={onConditionsReceived}
          />
        </Dialog>
      </Transition>
    </>
  );
};

export default CreatePaymentRequestPage;
