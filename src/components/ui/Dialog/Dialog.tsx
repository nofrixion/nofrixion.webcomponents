import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  okButtonText: string;
  cancelButtonText?: string;
  okButtonOnClick: () => void;
  cancelButtonOnClick?: () => void;
}

const CustomDialog = ({
  isOpen,
  onClose,
  title,
  message,
  okButtonText,
  cancelButtonText,
  okButtonOnClick,
  cancelButtonOnClick,
}: CustomDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white rounded-md shadow-[0px_0px_8px_rgba(4,_41,_49,_0.1)] p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {message && (
                  <div className="mt-2">
                    <p className="text-xs text-defaultText font-normal">{message}</p>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-center space-x-6">
                  {cancelButtonText && (
                    <button
                      className="inline-flex justify-center rounded-full bg-negativeActionBackground px-4 py-2 text-sm font-medium text-defaultText outline-0"
                      onClick={cancelButtonOnClick}
                    >
                      {cancelButtonText}
                    </button>
                  )}

                  <button
                    className="inline-flex justify-center rounded-full bg-positiveActionBackground px-4 py-2 text-sm font-medium text-white outline-0"
                    onClick={okButtonOnClick}
                  >
                    {okButtonText}
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

export default CustomDialog;
