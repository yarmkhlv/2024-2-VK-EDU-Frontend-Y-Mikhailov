import { Link } from 'react-router-dom';
import { countImageMessage } from './helpers/countImageMessage';
import { convertDate } from '../../../utils/convertDate';
import styles from './chatItem.module.scss';

export function ChatItem({ title, avatar, last_message, id, is_private }) {
  const avatarInitials = is_private
    ? title
        .split(' ')
        .map((el) => el[0])
        .join('')
    : title[0];

  const lastMessageTextRender = (() => {
    if (last_message?.voice) {
      return 'Голосовое сообщение';
    } else if (last_message?.files.length > 0) {
      const imageMessage = countImageMessage(last_message.files.length);
      return imageMessage;
    } else if (last_message?.text) {
      return last_message.text;
    } else {
      return 'Пока сообщений нет';
    }
  })();

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
          <div className={styles.userInfoBottom}>{lastMessageTextRender}</div>
        </div>
      </div>
    </Link>
  );
}
