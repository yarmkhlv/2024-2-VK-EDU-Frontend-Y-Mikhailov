import clsx from 'clsx';
import styles from './sectionChat.module.scss';
import PropTypes from 'prop-types';
import { convertDate } from '../../../utils/convertDate';

export function SectionChat({ messages }) {
  const renderMessages = messages.map((item, id) => (
    <div
      key={id}
      className={clsx(
        styles.message,
        item.owner === 'me' ? styles.ownMessage : styles.anotherPersonsMessage,
        item.labelNew && styles.newMessage
      )}
    >
      {item.text}
      <span className={styles.timeMessage}>{convertDate(item.date)}</span>
    </div>
  ));

  return (
    <section id="sectionChat" className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <div className={styles.messagesList}>{renderMessages}</div>
      </div>
    </section>
  );
}

SectionChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ),
};
