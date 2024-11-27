import clsx from 'clsx';
import { convertDate } from '../../../../../utils/convertDate';
import styles from './generalMessage.module.scss';

export function GeneralMessage({ currentUserId, messageData }) {
  const { sender, text, voice, created_at, files } = messageData;
  return currentUserId === sender.id ? (
    <div className={clsx(styles.message, styles.newMessage, styles.ownPerson)}>
      {voice ? (
        <audio>
          <source src={voice} type="audio/wav" />
          Ваш браузер не поддерживает аудиовоспроизведение.
        </audio>
      ) : (
        text
      )}
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
          {voice ? (
            <audio controls>
              <source src={voice} type="audio/wav" />
              Ваш браузер не поддерживает аудиовоспроизведение.
            </audio>
          ) : files.length > 0 ? (
            <div className={styles.imgContainer}>
              {files.map((el, i) => (
                <img className={styles.img} key={i} src={el.item} />
              ))}
            </div>
          ) : (
            text
          )}
          <span className={styles.timeMessage}>{convertDate(created_at)}</span>
        </div>
      </div>
    </div>
  );
}
