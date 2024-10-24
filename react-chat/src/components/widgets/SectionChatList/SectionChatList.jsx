import { ChatItem } from '../ChatItem/ChatItem';
import EditIcon from '@mui/icons-material/Edit';
import styles from './sectionChatList.module.scss';
import PropTypes from 'prop-types';

export function SectionChatList({ setId, openModal }) {
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
    </section>
  );
}

SectionChatList.propTypes = {
  setId: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
