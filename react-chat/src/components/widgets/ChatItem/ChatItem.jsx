import PropTypes from 'prop-types';

import { convertDate } from '../../../utils/convertDate';
import styles from './chatItem.module.scss';

export function ChatItem({ name, avatarUrl, messages, onClick }) {
  const lastMessage = messages[messages.length - 1];
  return (
    <div onClick={onClick} className={styles.user}>
      <img className={styles.userImg} src={avatarUrl} alt={`${name} аватар`} />
      <div className={styles.userInfo}>
        <div className={styles.userInfoUpper}>
          <div className={styles.infoUpperTitle}>{name}</div>
          {lastMessage && (
            <div className={styles.lastMessageStatus}>
              {convertDate(lastMessage.date)}
            </div>
          )}
        </div>
        {lastMessage && (
          <div className={styles.userInfoBottom}>{lastMessage.text}</div>
        )}
      </div>
    </div>
  );
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};
