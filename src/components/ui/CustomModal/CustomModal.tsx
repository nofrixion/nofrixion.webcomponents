import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Checkbox from '../Checkbox/Checkbox';
import classNames from 'classnames';

interface CustomModalProps extends BaseModalProps {
  title: string;
  enableUseAsDefault?: boolean;
  children: React.ReactNode;
  isDefault: boolean;
  onApplyEnabled?: boolean;
}

export interface BaseModalProps {
  open: boolean;
  onApply?: (data: any) => void;
  onDismiss: () => void;
}

interface CustomModalState {
  isDefaultChecked: boolean;
}

const CustomModal = ({
  title,
  children,
  open,
  enableUseAsDefault,
  isDefault,
  onApply,
  onDismiss,
  onApplyEnabled = true,
}: CustomModalProps) => {
  const [isDefaultChecked, setIsDefaultChecked] = useState<boolean>(isDefault);
  const [currentState, setCurrentState] = useState<CustomModalState>();

  const onApplyClicked = () => {
    if (!onApply) return;

    if (!enableUseAsDefault) {
      onApply({});
      return;
    }

    // Add the isDefaultChecked value to the formData
    const formData = {
      isDefaultChecked: isDefaultChecked,
    };

    setCurrentState({ isDefaultChecked: formData.isDefaultChecked });
    onApply(formData);
  };

  const handleOnDismiss = () => {
    onDismiss();

    // Reset to initial state
    if (currentState) {
      setIsDefaultChecked(currentState.isDefaultChecked);
    } else {
      setIsDefaultChecked(isDefault);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={handleOnDismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <button className="ml-auto mt-6 mr-6" onClick={handleOnDismiss}>
                  <svg
                    className="w-4 h-4 transition stroke-controlGrey hover:stroke-controlGreyHover"
                    width="16"
                    height="16"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.6667 14.3333L8 7.66665L14.6667 1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33335 0.999944L8 7.6666L1.33335 14.3333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <Dialog.Title as="h3" className="text-2xl font-medium leading-6 p-12 pt-2">
                  {title}
                </Dialog.Title>
                <div className="px-12">{children}</div>

                <div className="bg-mainGrey flex items-center pl-8 pr-6 py-4 mt-12">
                  {enableUseAsDefault && (
                    <div>
                      <Checkbox label="Use as my default" value={isDefaultChecked} onChange={setIsDefaultChecked} />
                    </div>
                  )}
                  <button
                    disabled={!onApplyEnabled}
                    type="button"
                    className={classNames(
                      'inline-flex justify-center rounded-full bg-[#006A80] py-3 px-16 text-sm text-white font-semibold ml-auto transition',
                      {
                        'cursor-pointer hover:bg-[#144752]': onApplyEnabled,
                        'opacity-20 cursor-not-allowed': !onApplyEnabled,
                      },
                    )}
                    onClick={onApplyClicked}
                  >
                    Apply
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomModal;
