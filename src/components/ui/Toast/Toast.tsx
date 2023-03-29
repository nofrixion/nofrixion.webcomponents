import { toast, ToastContainer, Slide, CloseButtonProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import closeIcon from '../../../assets/images/nf_close.svg';

interface ToastProps {
  positionY: 'top' | 'bottom';
  positionX: 'left' | 'center' | 'right';
  duration: number;
}

const makeToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'info':
      return toast.info(message);
    case 'warning':
      return toast.warning(message);
  }
};

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <a onClick={closeToast} className="py-2 pr-4">
    <img src={closeIcon} alt="Close" className="w-3 h-3" />
  </a>
);

const Toaster = ({ positionY, positionX, duration = 5000 }: ToastProps) => {
  return (
    <ToastContainer
      position={`${positionY}-${positionX}`}
      autoClose={duration}
      hideProgressBar={true}
      limit={3}
      transition={Slide}
      className="text-xs font-normal"
      icon={false}
      theme="colored"
      closeButton={CloseButton}
    />
  );
};

export { makeToast, Toaster };
