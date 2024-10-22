import { useState } from 'react';
import { ChatItem } from '../ChatItem/ChatItem';
import EditIcon from '@mui/icons-material/Edit';
import styles from './sectionChatList.module.scss';
import { createNewChat } from './helpers/createNewChat';
import { useModal } from '../../../utils/hooks/useModal';
import { Modal } from '../../shared/Modal/Modal';
import PropTypes from 'prop-types';

export function SectionChatList({ setId }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [userName, setUserName] = useState('');

  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];

  const renderChatUsers = usersFromLocalStorage.map((userData) => {
    return (
      <ChatItem
        key={userData.id}
        onClick={() => {
          setId(userData.id);
        }}
        {...userData}
      />
    );
  });

  const handleClickBtnCreate = () => {
    createNewChat(userName);
    setUserName('');
    closeModal();
  };
  const handleClickBtnClose = () => {
    setUserName('');
    closeModal();
  };

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <div className={styles.chatList}>{renderChatUsers}</div>
        <div className={styles.createChatContainer}>
          <button className={styles.createChatBtn} onClick={openModal}>
            <EditIcon sx={{ color: '#837d7d' }} />
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className={styles.modalForm}>
            <p>Введите имя пользователя</p>
            <input
              className={styles.inputModalForm}
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
              type="text"
            />
            <div className={styles.btnBlockModal}>
              <button
                className={styles.btnAtFormModal}
                onClick={handleClickBtnCreate}
              >
                Создать
              </button>
              <button
                className={styles.btnAtFormModal}
                onClick={handleClickBtnClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

SectionChatList.propTypes = {
  setId: PropTypes.func.isRequired,
};
