import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputAmountField from '../InputAmountField/InputAmountField';
import InputTextField from '../InputTextField/InputTextField';
import EditOptionCard from '../EditOptionCard/EditOptionCard';

import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
import NextIcon from '../../../assets/icons/next-icon.svg';
import InputTextAreaField from '../InputTextAreaField/InputTextAreaField';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateHeightWrapper from '../utils/AnimateHeight';

interface CreatePaymentRequestPageProps {
  label: string;
}

const CreatePaymentRequestPage = ({ label }: CreatePaymentRequestPageProps) => {
  let [isOpen, setIsOpen] = useState(true);

  const [amount, setAmount] = useState('399');
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('EUR');
  const [productOrService, setProductOrService] = useState('SEO & Content Services');
  const [description, setDescription] = useState('SEO optimization and content creation');
  const [firstName, setFirstName] = useState('Olivia');
  const [lastName, setLastName] = useState('Davis');
  const [email, setEmail] = useState('olivia.davis@example.com');

  const onCurrencyChange = (currency: string) => {
    setCurrency(currency as 'EUR' | 'GBP');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = (formValues: any) => {
    console.log("I'm here");

    console.log(formValues);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                  <div className="flex-1 pt-20">
                    <div className="flex items-center ">
                      <button className="inline-block ml-[3.25rem]" onClick={closeModal}>
                        <img src={BackButtonIcon} alt="Back button" className="w-6 h-6" />
                      </button>
                      <Dialog.Title as="h3" className="text-[1.75rem]/8 font-semibold inline-block ml-[2.875rem]">
                        New payment request
                      </Dialog.Title>
                    </div>
                    <div className="mt-14 ml-32">
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
                          optional
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>

                      <div className="mt-10">
                        <InputTextField
                          label="Last name"
                          optional
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <div className="mt-11">
                        <InputTextField
                          label="Email"
                          optional
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mt-14">
                        <div className="max-w-md space-y-2">
                          <EditOptionCard label="Payment conditions" value="Single full payment" onClick={() => {}} />
                          <EditOptionCard
                            label="Available methods"
                            value="Banks and cards"
                            details={[
                              '*Bank of Ireland* set up as priority bank.',
                              "Don't capture funds on cards is on.",
                            ]}
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex-1 bg-mainGrey w-full min-h-screen pl-[8.25rem] pr-32 pt-44">
                    {/* Amount */}
                    <AnimatePresence>
                      {currency && amount && (
                        <AnimateHeightWrapper key="amount">
                          <div className="flex overflow-hidden pb-10">
                            <span className="leading-6 text-greyText flex-1">Request</span>
                            <span className="font-semibold text-[2rem]/8 flex-1">
                              {currency == 'GBP' ? '£' : '€'} {amount}
                            </span>
                          </div>
                        </AnimateHeightWrapper>
                      )}
                    </AnimatePresence>

                    {/* For */}
                    <AnimatePresence>
                      {(productOrService || description) && (
                        <AnimateHeightWrapper key="product-or-service-wrapper">
                          <div className="flex pb-10">
                            <span className="leading-6 text-greyText flex-1">For</span>

                            <div className="flex flex-col flex-1">
                              <AnimatePresence>
                                {productOrService && (
                                  <AnimateHeightWrapper key="product-or-service">
                                    <span className="font-semibold w-[17.5rem] break-words text-lg/5 mb-2">
                                      {productOrService}
                                    </span>
                                  </AnimateHeightWrapper>
                                )}
                                <AnimatePresence>
                                  {description && (
                                    <AnimateHeightWrapper key="description">
                                      <p className="text-sm/5 w-[17.5rem] text-ellipsis break-words">{description}</p>
                                    </AnimateHeightWrapper>
                                  )}
                                </AnimatePresence>
                              </AnimatePresence>
                            </div>
                          </div>
                        </AnimateHeightWrapper>
                      )}
                    </AnimatePresence>

                    {/* From */}
                    <AnimatePresence>
                      {(firstName || lastName || email) && (
                        <AnimateHeightWrapper key="from">
                          <div className="flex">
                            {(firstName || lastName || email) && (
                              <span className="leading-6 text-greyText flex-1">From</span>
                            )}

                            <div className="flex flex-col flex-1">
                              <AnimatePresence>
                                {(firstName || lastName) && (
                                  <AnimateHeightWrapper key="name">
                                    <span className="font-semibold text-lg/5 mb-2">
                                      {firstName} {lastName}
                                    </span>
                                  </AnimateHeightWrapper>
                                )}
                              </AnimatePresence>
                              <AnimatePresence>
                                {email && (
                                  <AnimateHeightWrapper key="email">
                                    <p className="text-sm/5">{email}</p>
                                  </AnimateHeightWrapper>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </AnimateHeightWrapper>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {currency && amount && productOrService && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <button
                            type="button"
                            className="flex w-full justify-center rounded-full bg-[#006A80] py-3 px-16 text-sm text-white font-semibold ml-auto cursor-pointer transition hover:bg-[#144752] !mt-[19.25rem]"
                            onClick={() => {}}
                          >
                            Review payment request
                            <img src={NextIcon} alt="Arrow right" className="ml-2" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreatePaymentRequestPage;
