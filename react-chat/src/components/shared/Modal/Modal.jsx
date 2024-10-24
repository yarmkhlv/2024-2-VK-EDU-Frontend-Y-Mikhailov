import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import styles from './modal.module.scss';

export const Modal = ({ isOpen, onClose, children }) => {
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
