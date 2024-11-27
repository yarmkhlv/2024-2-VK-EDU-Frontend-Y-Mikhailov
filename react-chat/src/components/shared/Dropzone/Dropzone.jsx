import { useState } from 'react';
import clsx from 'clsx';
import styles from './dropzone.module.scss';
import ImageIcon from '@mui/icons-material/Image';

export function Dropzone({ children, handleDrop }) {
  const [isDragEnter, setIsDragEnter] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!isDragEnter) {
      setIsDragEnter(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragEnter(false);
    }
  };

  const wrapperHandleDrop = (e) => {
    e.preventDefault();
    setIsDragEnter(false);
    handleDrop(e);
  };

  return (
    <div
      className={clsx(styles.dropzone)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={wrapperHandleDrop}
    >
      {isDragEnter && (
        <div className={styles.dragEnter}>
          <div className={styles.container}>
            <p className={styles.text}>Отпустите, чтобы отправить</p>
            <ImageIcon sx={{ color: '#837d7d' }} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
