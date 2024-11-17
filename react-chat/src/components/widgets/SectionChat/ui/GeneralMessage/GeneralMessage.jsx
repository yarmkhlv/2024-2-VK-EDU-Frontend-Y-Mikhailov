import clsx from 'clsx';
import { convertDate } from '../../../../../utils/convertDate';
import styles from './generalMessage.module.scss';

export function GeneralMessage({ currentUserId, messageData }) {
  const { sender, text, created_at } = messageData;
  return currentUserId === sender.id ? (
    <div className={clsx(styles.message, styles.newMessage, styles.ownPerson)}>
      {text}
      <span className={styles.timeMessage}>{convertDate(created_at)}</span>
    </div>
  ) : (
    <div
      className={clsx(
        styles.messageContainer,
        styles.newMessage,
        styles.anotherPerson
      )}
    >
      <div className={styles.avatar}>
        {sender.avatar ? (
          <img
            className={styles.userImg}
            src={sender.avatar}
            alt="Изображение чата"
          />
        ) : (
          <span className={styles.initials}>
            {sender.first_name[0] + sender.last_name[0]}
          </span>
        )}
      </div>
      <div className={styles.blockWithText}>
        <div className={clsx(styles.username)}>{sender.username}</div>
        <div className={styles.message}>
          {text}
          <span className={styles.timeMessage}>{convertDate(created_at)}</span>
        </div>
      </div>
    </div>
  );
}
