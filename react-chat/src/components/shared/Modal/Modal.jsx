import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { useEffect } from 'react';
import styles from './modal.module.scss';

export const Modal = ({ isOpen, onClose, children, classes }) => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      root.inert = true;
    } else {
      document.body.style.overflow = '';
      root.inert = false;
    }

    return () => {
      document.body.style.overflow = '';
      const root = document.getElementById('root');
      root.inert = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(styles.modalOverlay, classes?.additionalModalOverlay)}
      onClick={onClose}
    >
      <div
        className={clsx(styles.modalContent, classes?.additionalModalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
