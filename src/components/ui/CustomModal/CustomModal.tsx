import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Checkbox from '../Checkbox/Checkbox';

interface CustomModalProps extends BaseModalProps {
  title: string;
  enableUseAsDefault?: boolean;
  children: React.ReactNode;
}

export interface BaseModalProps {
  open: boolean;
  onApply?: (data: any) => void;
  onDismiss: () => void;
}

const CustomModal = ({ title, children, open, enableUseAsDefault, onApply, onDismiss }: CustomModalProps) => {
  const [isDefaultChecked, setIsDefaultChecked] = useState<boolean>(false);

  const onApplyClicked = () => {
    if (!onApply) return;

    if (!enableUseAsDefault) {
      onApply({});
      return;
    }

    // Add the isDefaultChecked value to the formData
    const formData = {
      isDefaultChecked,
    };

    onApply(formData);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onDismiss}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-medium leading-6 p-12">
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
                    type="button"
                    className="inline-flex justify-center rounded-full bg-[#006A80] py-3 px-16 text-sm text-white font-semibold ml-auto cursor-pointer transition hover:bg-[#144752]"
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
