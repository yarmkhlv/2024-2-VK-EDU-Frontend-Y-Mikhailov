import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate } from '../../../utils/convertDate';
import styles from './chatItem.module.scss';

export function ChatItem({ name, avatarUrl, messages, id }) {
  const lastMessage = messages[messages.length - 1];
  return (
    <Link to={`/chat/:${id}`} className={styles.link}>
      <div className={styles.user}>
        <img
          className={styles.userImg}
          src={avatarUrl}
          alt="Изображение профиля"
        />
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
    </Link>
  );
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};
