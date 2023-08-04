import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputAmountField from '../InputAmountField/InputAmountField';
import InputTextField from '../InputTextField/InputTextField';
import EditOptionCard from '../EditOptionCard/EditOptionCard';

import AlertIcon from '../../../assets/icons/alert-icon.svg';
import RedAlertIcon from '../../../assets/icons/red-alert-icon.svg';
import NextIcon from '../../../assets/icons/next-icon.svg';
import InputTextAreaField from '../InputTextAreaField/InputTextAreaField';
import { AnimatePresence, motion } from 'framer-motion';
import LayoutWrapper from '../utils/LayoutWrapper';
import PaymentMethodsModal from '../Modals/PaymentMethodsModal/PaymentMethodsModal';
import {
  Currency,
  BankSettings,
  NotificationEmailsDefaults,
  PaymentConditionsDefaults,
  PaymentMethodsDefaults,
  UserPaymentDefaults,
  ApiError,
} from '@nofrixion/moneymoov';
import {
  LocalPaymentConditionsFormValue,
  LocalPaymentMethodsFormValue,
  LocalPaymentNotificationsFormValue,
  LocalPaymentRequestCreate,
} from '../../../types/LocalTypes';
import classNames from 'classnames';
import PaymentConditionsModal from '../Modals/PaymentConditionsModal/PaymentConditionsModal';

import { formatEmailAddressesForSummary, parseBoldText } from '../../../utils/uiFormaters';

import PaymentMethodIcon from '../utils/PaymentMethodIcon';
import _ from 'lodash';
import PaymentNotificationsModal from '../Modals/PaymentNotificationsModal/PaymentNotificationsModal';
import { validateEmail } from '../../../utils/validation';
import { formatAmountAndDecimals } from '../../../utils/formatters';
import BackArrow from '../utils/BackArrow';
import { Button } from '@/components/ui/atoms';
import { Loader } from '@/components/ui/Loader/Loader';
import AnimateHeightWrapper from '@/components/ui/utils/AnimateHeight';

interface CreatePaymentRequestPageProps {
  banks: BankSettings[];
  userPaymentDefaults?: UserPaymentDefaults;
  onConfirm: (data: LocalPaymentRequestCreate) => Promise<ApiError | undefined>;
  isOpen: boolean;
  onClose: () => void;
  onDefaultsChanged: (data: UserPaymentDefaults) => void;
  isUserPaymentDefaultsLoading: boolean;
  prefilledData?: LocalPaymentRequestCreate;
}

const durationAnimationWidth = 0.3;

const CreatePaymentRequestPage = ({
  banks,
  userPaymentDefaults,
  onConfirm,
  isOpen,
  onClose,
  onDefaultsChanged,
  isUserPaymentDefaultsLoading,
  prefilledData,
}: CreatePaymentRequestPageProps) => {
  const [amount, setAmount] = useState(prefilledData?.amount.toString() ?? '');
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>((prefilledData?.currency ?? 'EUR') as 'EUR' | 'GBP');
  const [productOrService, setProductOrService] = useState(prefilledData?.productOrService ?? '');
  const [description, setDescription] = useState(prefilledData?.description ?? '');
  const [firstName, setFirstName] = useState(prefilledData?.firstName ?? '');
  const [lastName, setLastName] = useState(prefilledData?.lastName ?? '');
  const [email, setEmail] = useState(prefilledData?.email ?? '');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [defaultsChanged, setDefaultsChanged] = useState(false);

  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const findBank = (bankID: string | undefined) => {
    if (!bankID) {
      return undefined;
    }
    const bank = banks.find((b) => b.bankID === bankID);
    return bank ? { id: bank.bankID, name: bank.bankName } : undefined;
  };

  const [paymentMethodsFormValue, setPaymentMethodsFormValue] = useState<LocalPaymentMethodsFormValue>({
    isBankEnabled: true,
    isCardEnabled: true,
    isWalletEnabled: true,
    isLightningEnabled: false,
    isCaptureFundsEnabled: true,
    isDefault: false,
  });

  const [paymentConditionsFormValue, setPaymentConditionsFormValue] = useState<LocalPaymentConditionsFormValue>({
    allowPartialPayments: false,
    isDefault: false,
  });

  const [paymentNotificationsFormValue, setPaymentNotificationsFormValue] =
    useState<LocalPaymentNotificationsFormValue>({
      emailAddresses: '',
      isDefault: false,
    });

  const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] = useState(false);
  const [isPaymentConditionsModalOpen, setIsPaymentConditionsModalOpen] = useState(false);
  const [isPaymentNotificationsModalOpen, setIsPaymentNotificationsModalOpen] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [submitErrorMessages, setSubmitErrorMessages] = useState<string[]>([]);

  const convertPrefilledDataToPaymentMethodDefaults = (): PaymentMethodsDefaults => {
    return {
      pisp: prefilledData?.paymentMethods?.bank?.active ?? false,
      card: prefilledData?.paymentMethods?.card?.active ?? false,
      wallet: prefilledData?.paymentMethods?.wallet ?? false,
      lightning: prefilledData?.paymentMethods?.lightning ?? false,
      cardAuthorizeOnly: !prefilledData?.paymentMethods?.card?.captureFunds,
      pispPriorityBankID: prefilledData?.paymentMethods?.bank?.priority?.id ?? '',
      pispPriorityBank: !!prefilledData?.paymentMethods?.bank?.priority?.id,
    };
  };
  const convertPrefilledDataToPaymentConditionsDefaults = (): PaymentConditionsDefaults => {
    return {
      allowPartialPayments: prefilledData?.paymentConditions?.allowPartialPayments ?? false,
    };
  };
  const convertPrefilledDataToNotificationEmailsDefaults = (): NotificationEmailsDefaults => {
    return {
      emailAddresses: prefilledData?.notificationEmailAddresses ?? '',
    };
  };

  const fillDefaultPaymentMethods = () => {
    setPaymentMethodsFormValue({
      isBankEnabled: userPaymentDefaults?.paymentMethodsDefaults?.pisp ?? true,
      isCardEnabled: userPaymentDefaults?.paymentMethodsDefaults?.card ?? true,
      isWalletEnabled: userPaymentDefaults?.paymentMethodsDefaults?.wallet ?? true,
      isLightningEnabled: userPaymentDefaults?.paymentMethodsDefaults?.lightning ?? false,
      isCaptureFundsEnabled: !userPaymentDefaults?.paymentMethodsDefaults?.cardAuthorizeOnly ?? true,
      priorityBank: findBank(userPaymentDefaults?.paymentMethodsDefaults?.pispPriorityBankID),
      isDefault: !!userPaymentDefaults?.paymentMethodsDefaults,
    });
  };

  const fillDefaultPaymentConditions = () => {
    setPaymentConditionsFormValue({
      allowPartialPayments: userPaymentDefaults?.paymentConditionsDefaults?.allowPartialPayments ?? false,
      isDefault: !!userPaymentDefaults?.paymentConditionsDefaults,
    });
  };

  const fillDefaultNotificationEmailAddresses = () => {
    setPaymentNotificationsFormValue({
      emailAddresses: userPaymentDefaults?.notificationEmailsDefaults?.emailAddresses ?? '',
      isDefault: !!userPaymentDefaults?.notificationEmailsDefaults,
    });
  };

  useEffect(() => {
    if (userPaymentDefaults?.paymentMethodsDefaults) {
      fillDefaultPaymentMethods();
    }

    if (userPaymentDefaults?.paymentConditionsDefaults) {
      fillDefaultPaymentConditions();
    }

    fillDefaultNotificationEmailAddresses();
  }, [userPaymentDefaults]);

  useEffect(() => {
    setAmount(prefilledData?.amount.toString() ?? '');
    setCurrency((prefilledData?.currency ?? 'EUR') as 'EUR' | 'GBP');
    setProductOrService(prefilledData?.productOrService ?? '');
    setDescription(prefilledData?.description ?? '');
    setFirstName(prefilledData?.firstName ?? '');
    setLastName(prefilledData?.lastName ?? '');
    setEmail(prefilledData?.email ?? '');

    if (prefilledData?.paymentMethods) {
      setPaymentMethodsFormValue({
        isBankEnabled: prefilledData?.paymentMethods?.bank?.active ?? false,
        isCardEnabled: prefilledData?.paymentMethods?.card?.active ?? false,
        isWalletEnabled: prefilledData?.paymentMethods?.wallet ?? false,
        isLightningEnabled: prefilledData?.paymentMethods?.lightning ?? false,
        isCaptureFundsEnabled: prefilledData?.paymentMethods?.card?.captureFunds ?? false,
        priorityBank: prefilledData?.paymentMethods?.bank?.priority?.id
          ? findBank(prefilledData?.paymentMethods?.bank?.priority?.id)
          : undefined,
        isDefault: false,
      });
    } else {
      fillDefaultPaymentMethods();
    }

    if (prefilledData?.paymentConditions) {
      setPaymentConditionsFormValue({
        allowPartialPayments: prefilledData?.paymentConditions?.allowPartialPayments ?? false,
        isDefault: false,
      });
    } else {
      fillDefaultPaymentConditions();
    }

    if (prefilledData?.notificationEmailAddresses) {
      setPaymentNotificationsFormValue({
        emailAddresses: prefilledData?.notificationEmailAddresses ?? '',
        isDefault: false,
      });
    } else {
      fillDefaultNotificationEmailAddresses();
    }
  }, [prefilledData]);

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

  const onPaymentNotificationsReceived = (data: LocalPaymentNotificationsFormValue) => {
    setIsPaymentNotificationsModalOpen(false);

    setPaymentNotificationsFormValue(data);

    // Since there's no way to cancel the modal, we need to check if the data has changed
    if (!_.isEqual(data, paymentNotificationsFormValue)) {
      setDefaultsChanged(true);
    }
  };

  const onReviewClicked = () => {
    if (email && onValidateEmail(email)) {
      return;
    }

    if (description && onValidateDescription(description)) {
      return;
    }

    setIsReviewing(true);
  };

  const onConfirmClicked = async () => {
    setIsSubmitting(true);
    setShowSubmitError(false);
    setSubmitErrorMessages([]);

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
          // Capture funds should always be true when card is disabled
          // as it's not possible to only authorize on cards if card are disabled
          captureFunds: paymentMethodsFormValue.isCardEnabled ? paymentMethodsFormValue.isCaptureFundsEnabled : true,
        },
        wallet: paymentMethodsFormValue.isWalletEnabled,
        lightning: paymentMethodsFormValue.isLightningEnabled,
      },
      notificationEmailAddresses: paymentNotificationsFormValue.emailAddresses,
    };

    const apiError = await onConfirm(paymentRequestToCreate);

    if (apiError) {
      let errorMessages: string[] = [];
      if (apiError.errors) {
        Object.keys(apiError.errors).forEach((key) => {
          const error = apiError.errors![key];
          errorMessages = errorMessages.concat(error);
        });
      }

      setSubmitErrorMessages(errorMessages);
      setShowSubmitError(true);
      setIsSubmitting(false);
      return;
    }

    if (defaultsChanged) {
      handleDefaultsChanged();
    }

    resetStates();

    setIsSubmitting(false);
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

    if (paymentNotificationsFormValue.isDefault) {
      defaults.notificationEmailsDefaults = {
        emailAddresses: paymentNotificationsFormValue.emailAddresses,
      };
    } else {
      defaults.notificationEmailsDefaults = undefined;
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
    setPaymentNotificationsFormValue({
      emailAddresses: '',
      isDefault: false,
    });
    setIsReviewing(false);
  };

  const availableMethodsDetails = [
    ...(paymentMethodsFormValue.isBankEnabled && paymentMethodsFormValue.priorityBank
      ? [`*${paymentMethodsFormValue.priorityBank.name}* set up as priority bank.`]
      : []),
    ...(paymentMethodsFormValue.isCardEnabled && !paymentMethodsFormValue.isCaptureFundsEnabled
      ? ["Don't capture funds on cards is on."]
      : []),
  ];

  const onValidateEmail = (email: string) => {
    if (email && !validateEmail(email)) {
      setHasEmailError(true);
      return 'Make sure the email address is valid.';
    }

    setHasEmailError(false);
  };

  const onValidateDescription = (description: string): string | undefined => {
    // Get invalid characters if any (using the same regex from backend "[a-zA-Z0-9\-_\.@&\*%\$#!:;'""()\[\] ]+")
    const invalidCharacters = description.match(/[^a-zA-Z0-9\-_\.@&\*%\$#!:;'""()\[\] ]+/g);

    if (description.length > 0 && invalidCharacters) {
      // Singular
      if (invalidCharacters.length === 1) {
        return `The character "${invalidCharacters[0]}" is not allowed in the description`;
      }

      // Plural
      return `The characters "${invalidCharacters.join('')}" are not allowed in the description`;
    }
  };

  const getMinimumAmountPerCurrency = (currency: string) => {
    switch (currency) {
      case 'EUR':
        return 1;
      case 'GBP':
        return 2;
      default:
        return 0;
    }
  };

  const reviewRowClassNames = 'flex overflow-hidden items-baseline flex-col gap-2 md:gap-0 md:flex-row';

  const renderSettingsReview = () => {
    return (
      <>
        <div className="h-px w-full bg-borderGrey mt-6 md:mt-12"></div>
        <div className={classNames('mt-6 md:mt-12', reviewRowClassNames)}>
          <span className="leading-6 text-greyText w-40 shrink-0">Settings</span>
          <div className="flex flex-col w-full space-y-4 md:space-y-6">
            <span className="text-sm/6">
              {!paymentConditionsFormValue.allowPartialPayments ? 'Single full payment' : 'Partial payments'}
            </span>

            <div className="flex items-center space-x-3">
              <PaymentMethodIcon paymentMethod="bank" enabled={paymentMethodsFormValue.isBankEnabled} />
              <PaymentMethodIcon paymentMethod="card" enabled={paymentMethodsFormValue.isCardEnabled} />
              <PaymentMethodIcon paymentMethod="wallet" enabled={paymentMethodsFormValue.isWalletEnabled} />
              <PaymentMethodIcon paymentMethod="lightning" enabled={paymentMethodsFormValue.isLightningEnabled} />
            </div>

            {availableMethodsDetails.length > 0 && (
              <div className="flex flex-col text-greyText text-xs">
                {availableMethodsDetails?.map((detail, index) => {
                  return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
                })}
              </div>
            )}

            {paymentNotificationsFormValue.emailAddresses && (
              <div className="flex text-greyText text-xs">
                <span>
                  Payment notification to {formatEmailAddressesForSummary(paymentNotificationsFormValue.emailAddresses)}
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderReviewSummary = () => {
    const { amountValueWithCommas, amountDecimals } = formatAmountAndDecimals(Number(amount));

    return (
      <div className="w-full lg:max-w-sm xl:max-w-lg mx-auto mt-6 md:mt-44">
        <div className="space-y-5 md:space-y-10">
          <AnimatePresence>
            {/* Amount */}
            {currency && amount && (
              <LayoutWrapper key="amount" className={reviewRowClassNames}>
                <span className="leading-6 text-greyText w-40 shrink-0">Amount</span>
                <span
                  className={classNames('font-semibold text-[2rem]/8 inline p-1', {
                    'bg-warningYellow rounded':
                      currency &&
                      amount &&
                      paymentMethodsFormValue?.isBankEnabled === true &&
                      Number(amount) < getMinimumAmountPerCurrency(currency),
                  })}
                >
                  {currency == 'GBP' ? '£' : '€'} {amountValueWithCommas}
                  <sup className="ml-0.5 text-xl">.{amountDecimals}</sup>
                  {currency &&
                    amount &&
                    paymentMethodsFormValue?.isBankEnabled === true &&
                    Number(amount) < getMinimumAmountPerCurrency(currency) && (
                      <img src={AlertIcon} className="inline-block ml-2 w-4 h-4" alt="Alert" title="Alert" />
                    )}
                </span>
              </LayoutWrapper>
            )}

            {/* Product or service + description */}
            {(productOrService || description) && (
              <LayoutWrapper key="product-or-service-wrapper" className={reviewRowClassNames}>
                <span className="leading-6 text-greyText w-40 shrink-0">Product/Service</span>

                <div className="flex flex-col w-full">
                  {productOrService && (
                    <LayoutWrapper key="product-or-service">
                      <p className="font-semibold w-full break-words text-lg/5 mb-0.5 md:mb-2">{productOrService}</p>
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
              <LayoutWrapper key="from" className={reviewRowClassNames}>
                <span className="leading-6 text-greyText w-40 shrink-0 break-words">Customer</span>

                <div className="flex flex-col w-full">
                  {(firstName || lastName) && (
                    <motion.p layout="position" className="font-semibold text-lg/5 mb-0.5 md:mb-2 break-words">
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
            {/* Show only on desktop so we get the animation only on desktop */}
            {isReviewing && (
              <div className="hidden md:block">
                <LayoutWrapper key="settings" animateOnExit={false} duration={0.6} delay={durationAnimationWidth / 1.5}>
                  {renderSettingsReview()}
                </LayoutWrapper>
              </div>
            )}

            {/* Show only on desktop so we DONt get the animation on mobile */}
            {isReviewing && <div className="block md:hidden">{renderSettingsReview()}</div>}

            {/* Buttons */}
            {currency &&
              amount &&
              (!paymentMethodsFormValue?.isBankEnabled || Number(amount) >= getMinimumAmountPerCurrency(currency)) &&
              productOrService && (
                <LayoutWrapper
                  key="buttons"
                  className="flex flex-col !mt-20 justify-center sticky bottom-4 w-full lg:w-full mx-auto lg:mx-0 lg:static lg:bottom-auto"
                >
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
                        key="confirm-pr"
                        layout={false}
                        className="space-y-7"
                        animateOnExit={false}
                        duration={0.6}
                      >
                        <AnimatePresence>
                          {showSubmitError && (
                            <AnimateHeightWrapper layoutId="submit-error">
                              <motion.div
                                className="border-2 border-solid border-negativeRed rounded px-4 py-6 flex flex-row space-x-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <img src={RedAlertIcon} alt="Warning" title="Warning" className="w-4 h-4" />
                                <div className="[&>p]:text-default-text [&>p]:text-13px [&>p]:leading-5 [&>p]:font-normal [&>p]:py-1">
                                  <span className="text-base leading-4 font-semibold text-default-text block mb-2">
                                    The payment request couldn't be created
                                  </span>
                                  {submitErrorMessages && submitErrorMessages.length > 0 ? (
                                    submitErrorMessages.map((message, index) => <p>{message}</p>)
                                  ) : (
                                    <p>
                                      Please try again and, if the problem persists, you can contact us at{' '}
                                      <a className="underline" href="mailto:support@nofrixion.com" target="_blank">
                                        support@nofrixion.com
                                      </a>
                                      .
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            </AnimateHeightWrapper>
                          )}
                        </AnimatePresence>
                        <Button
                          variant={isSubmitting ? 'text' : 'primaryDark'}
                          size="big"
                          onClick={onConfirmClicked}
                          disabled={isSubmitting}
                          className={classNames({
                            '!bg-greyText disabled:!opacity-100': isSubmitting,
                          })}
                        >
                          {isSubmitting ? <Loader className="h-6 w-6 ml-0.5" /> : 'Confirm payment request'}
                        </Button>

                        {/* Edit button */}
                        <Button variant="secondary" size="big" onClick={() => setIsReviewing(false)}>
                          Edit
                        </Button>
                      </LayoutWrapper>
                    )}
                  </AnimatePresence>
                </LayoutWrapper>
              )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderBackArrow = () => {
    return (
      <BackArrow
        intent={isReviewing ? 'back' : 'close'}
        onClick={() => {
          if (isReviewing) {
            setIsReviewing(false);
            return;
          }

          onClose();
        }}
      />
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative font-inter text-default-text z-50" onClose={() => {}}>
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
                <Dialog.Panel className="w-full transform bg-white text-left align-middle transition-all min-h-screen px-6 lg:px-0 lg:flex">
                  {/* Left side & Right side on mobile */}
                  <AnimatePresence initial={false}>
                    {!isReviewing && (
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, flex: 0 }}
                        animate={{ opacity: 1, flex: 1, transition: { duration: durationAnimationWidth } }}
                        exit={{ opacity: 0, width: 0, flex: 0, transition: { duration: durationAnimationWidth } }}
                      >
                        <>
                          <div className="w-full pt-10 lg:pt-20 pb-28">
                            <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-4 lg:gap-[2.875rem] lg:items-center mb-12 md:mb-14">
                              {renderBackArrow()}
                              <Dialog.Title
                                as="h3"
                                className="text-2xl md:text-[1.75rem]/8 font-semibold inline-block text-clip md:whitespace-nowrap -mr-6"
                              >
                                New payment request
                              </Dialog.Title>
                            </div>
                            <div className="lg:w-[27rem] lg:ml-[7.625rem] lg:mr-12 xl:mr-0">
                              <div className="mb-11">
                                <div className="md:w-72 lg:w-[13.938rem]">
                                  <InputAmountField
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    onCurrencyChange={onCurrencyChange}
                                    currency={currency}
                                  />
                                </div>
                                <AnimatePresence initial={false}>
                                  {currency &&
                                    amount &&
                                    paymentMethodsFormValue?.isBankEnabled === true &&
                                    Number(amount) < getMinimumAmountPerCurrency(currency) && (
                                      <AnimateHeightWrapper layoutId="amount-validation">
                                        <div className="w-full p-3 mt-2 bg-warningYellow rounded">
                                          <p className="text-sm text-default-text font-normal">
                                            The minimum amount for bank payments is {currency == 'GBP' ? '£' : '€'}
                                            {formatter.format(getMinimumAmountPerCurrency(currency))}. You must use
                                            another payment method for lower amounts.
                                          </p>
                                        </div>
                                      </AnimateHeightWrapper>
                                    )}
                                </AnimatePresence>
                              </div>

                              <div className="mb-9">
                                <InputTextField
                                  label="Product or service"
                                  maxLength={40}
                                  value={productOrService}
                                  onChange={(e) => setProductOrService(e.target.value)}
                                  required
                                />
                              </div>

                              <div className="mb-14">
                                <InputTextAreaField
                                  label="Description"
                                  maxLength={140}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  validation={onValidateDescription}
                                  enableQuickValidation
                                />
                              </div>

                              <div className="space-y-10 mb-14">
                                <h4 className="text-lg/6 font-semibold">Customer info</h4>
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    validation={onValidateEmail}
                                  />
                                </div>
                              </div>

                              <div>
                                <h4 className="text-lg/6 font-semibold mb-6">Settings</h4>
                                <div className="w-full space-y-4 md:space-y-2">
                                  <EditOptionCard
                                    label="Payment conditions"
                                    values={[
                                      !paymentConditionsFormValue.allowPartialPayments
                                        ? 'Single full payment'
                                        : 'Partial payments',
                                    ]}
                                    onClick={() => {
                                      setIsPaymentConditionsModalOpen(true);
                                    }}
                                    isLoading={isUserPaymentDefaultsLoading}
                                  />
                                  <EditOptionCard
                                    label="Payment methods"
                                    details={availableMethodsDetails}
                                    onClick={() => {
                                      setIsPaymentMethodsModalOpen(true);
                                    }}
                                    isLoading={isUserPaymentDefaultsLoading}
                                  >
                                    <div className="flex items-center space-x-6 md:space-x-3">
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
                                  <EditOptionCard
                                    label="Payment notifications"
                                    values={
                                      paymentNotificationsFormValue
                                        ? paymentNotificationsFormValue.emailAddresses
                                            .split(',')
                                            .map((email) => email.trim())
                                        : []
                                    }
                                    onClick={() => {
                                      setIsPaymentNotificationsModalOpen(true);
                                    }}
                                    isLoading={isUserPaymentDefaultsLoading}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Review PR sticky button for mobile */}
                          <AnimatePresence initial={false}>
                            {/* Review PR */}
                            {currency &&
                              amount &&
                              (!paymentMethodsFormValue?.isBankEnabled ||
                                Number(amount) >= getMinimumAmountPerCurrency(currency)) &&
                              productOrService && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 20 }}
                                  className="block lg:hidden sticky bottom-0 w-full mx-auto pb-4"
                                >
                                  <Button variant="secondary" size="big" onClick={onReviewClicked} nextArrow>
                                    Review payment request
                                  </Button>
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </>
                      </motion.div>
                    )}

                    {/*  Right side on mobile */}
                    {isReviewing && (
                      <div className="min-h-screen lg:hidden pt-10 pb-10">
                        {renderBackArrow()}
                        {renderReviewSummary()}
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Right side */}
                  <div className="hidden lg:block lg:flex-1 bg-mainGrey">{renderReviewSummary()}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          {!isUserPaymentDefaultsLoading && (
            <PaymentMethodsModal
              currencySymbol={currency == 'GBP' ? '£' : '€'}
              amount={amount}
              minimumCurrencyAmount={getMinimumAmountPerCurrency(currency)}
              open={isPaymentMethodsModalOpen}
              userDefaults={
                prefilledData?.paymentMethods
                  ? convertPrefilledDataToPaymentMethodDefaults()
                  : userPaymentDefaults?.paymentMethodsDefaults
              }
              isPrefilledData={!!prefilledData?.paymentMethods}
              onApply={onMethodsReceived}
              onDismiss={() => setIsPaymentMethodsModalOpen(false)}
              banks={banks}
            />
          )}

          {!isUserPaymentDefaultsLoading && (
            <PaymentConditionsModal
              open={isPaymentConditionsModalOpen}
              userDefaults={
                prefilledData?.paymentConditions
                  ? convertPrefilledDataToPaymentConditionsDefaults()
                  : userPaymentDefaults?.paymentConditionsDefaults
              }
              isPrefilledData={!!prefilledData?.paymentConditions}
              onDismiss={() => setIsPaymentConditionsModalOpen(false)}
              onApply={onConditionsReceived}
            />
          )}

          {!isUserPaymentDefaultsLoading && (
            <PaymentNotificationsModal
              open={isPaymentNotificationsModalOpen}
              userDefaults={
                prefilledData?.notificationEmailAddresses
                  ? convertPrefilledDataToNotificationEmailsDefaults()
                  : userPaymentDefaults?.notificationEmailsDefaults
              }
              isPrefilledData={!!prefilledData?.notificationEmailAddresses}
              onDismiss={() => setIsPaymentNotificationsModalOpen(false)}
              onApply={onPaymentNotificationsReceived}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
};

export default CreatePaymentRequestPage;
