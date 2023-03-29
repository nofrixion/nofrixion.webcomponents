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
  <a onClick={closeToast} className="top-0 bottom-0 my-auto">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="group [&>path]:stroke-[#454d54] w-3 h-3"
      version="1.1"
    >
      <path d="m 12.354,0.354 -12.00000001,12" stroke="none" className="group-hover:stroke-[#8F99A3]" id="path2" />
      <path
        d="M 0.35355339,0.35355339 12.353553,12.353553"
        stroke="none"
        className="group-hover:stroke-[#8F99A3]"
        id="path2-8"
      />
    </svg>
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
      className="text-sm leading-[18px] font-normal"
      icon={false}
      theme="colored"
      closeButton={CloseButton}
    />
  );
};

export { makeToast, Toaster };
