import { Link } from 'react-router-dom';

import { convertDate } from '../../../utils/convertDate';
import styles from './chatItem.module.scss';

export function ChatItem({ title, avatar, last_message, id, is_private }) {
  const avatarInitials = is_private
    ? title
        .split(' ')
        .map((el) => el[0])
        .join('')
    : title[0];

  return (
    <Link to={`/chat/${id}`} className={styles.link}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {avatar ? (
            <img
              className={styles.userImg}
              src={avatar}
              alt="Изображение чата"
            />
          ) : (
            <span className={styles.initials}>{avatarInitials}</span>
          )}
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userInfoUpper}>
            <div className={styles.infoUpperTitle}>{title}</div>
            {last_message && (
              <div className={styles.lastMessageStatus}>
                {convertDate(last_message.created_at)}
              </div>
            )}
          </div>
          {last_message && (
            <div className={styles.userInfoBottom}>{last_message.text}</div>
          )}
        </div>
      </div>
    </Link>
  );
}
