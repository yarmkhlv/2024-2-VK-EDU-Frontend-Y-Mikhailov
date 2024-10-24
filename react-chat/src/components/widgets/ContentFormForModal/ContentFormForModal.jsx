import { useRef, useId } from 'react';
import { createNewChat } from '../ContentFormForModal/helpers/createNewChat';
import PropTypes from 'prop-types';
import styles from './contentFormForModal.module.scss';

export function ContentFormForModal({ closeModal }) {
  const userNameInputId = useId();
  const inputRef = useRef(null);

  const handleClickBtnCreate = () => {
    const value = inputRef?.current?.value;
    if (!value) return;
    const trimmedUserName = value.trim();
    if (!trimmedUserName) {
      inputRef.current.value = '';
      return;
    }
    createNewChat(trimmedUserName);
    inputRef.current.value = '';
    closeModal();
  };
  const handleClickBtnClose = () => {
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
    closeModal();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClickBtnCreate();
    }
  };

  return (
    <div className={styles.modalForm}>
      <label htmlFor={userNameInputId}>Введите имя пользователя</label>
      <input
        id={userNameInputId}
        ref={inputRef}
        className={styles.inputModalForm}
        type="text"
        onKeyDown={handleKeyDown}
      />
      <div className={styles.btnBlockModal}>
        <button
          className={styles.btnAtFormModal}
          onClick={handleClickBtnCreate}
        >
          Создать
        </button>
        <button className={styles.btnAtFormModal} onClick={handleClickBtnClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

ContentFormForModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
