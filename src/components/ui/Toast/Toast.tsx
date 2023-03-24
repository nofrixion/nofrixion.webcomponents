import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

const Toaster = ({ positionY, positionX, duration = 5000 }: ToastProps) => {
  return (
    <ToastContainer
      position={`${positionY}-${positionX}`}
      autoClose={duration}
      hideProgressBar={true}
      limit={3}
      transition={Zoom}
      className="text-xs font-normal"
      icon={false}
      theme="colored"
    />
  );
};

export { makeToast, Toaster };
