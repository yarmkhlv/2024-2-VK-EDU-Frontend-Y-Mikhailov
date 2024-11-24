import { toast } from 'react-toastify';

export const successToast = (text, delay = 1500) => {
  toast.success(text, {
    position: 'bottom-right',
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const rejectToast = (text) => {
  toast.error(text, {
    position: 'bottom-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
