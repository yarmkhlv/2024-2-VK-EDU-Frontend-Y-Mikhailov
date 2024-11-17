import clsx from 'clsx';
import { convertDate } from '../../../../../utils/convertDate';
import styles from './privateMessage.module.scss';

export function PrivateMessage({ currentUserId, messageData }) {
  const { sender, text, created_at } = messageData;
  return (
    <div
      className={clsx(
        styles.message,
        currentUserId === sender.id
          ? styles.ownMessage
          : styles.anotherPersonsMessage,
        styles.newMessage
      )}
    >
      {text}
      <span className={styles.timeMessage}>{convertDate(created_at)}</span>
    </div>
  );
}
