import { useState } from 'react';
import { updMessagesAtLocalStorage, makeAnswerMessage } from './helpers';
import styles from './sectionInput.module.scss';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';

export function SectionInput({ id, setActualMessages }) {
  const [textMessage, setTextMessage] = useState('');

  const recordNewMessage = () => {
    const newMessage = {
      text: textMessage,
      date: new Date().toISOString(),
      owner: 'me',
    };
    updMessagesAtLocalStorage(id, newMessage);
    setActualMessages((prevMessages) => [
      ...prevMessages,
      { ...newMessage, labelNew: true },
    ]);
  };

  const recordNewMessageFromAnotherUser = () => {
    setTimeout(() => {
      const anotherUserNewMessage = makeAnswerMessage();
      updMessagesAtLocalStorage(id, anotherUserNewMessage);
      setActualMessages((prevMessages) => [
        ...prevMessages,
        { ...anotherUserNewMessage, labelNew: true },
      ]);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (textMessage.trim() === '') return;

    recordNewMessage();
    recordNewMessageFromAnotherUser();

    setTextMessage('');
  };

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.form}
          action="/"
        >
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.currentTarget.value)}
            className={styles.input}
            name="message-text"
            placeholder="Введите сообщение"
            type="text"
            autoFocus
            autoComplete="off"
          />
          <button className={styles.submitBtn} type="submit">
            <SendIcon sx={{ color: '#837d7d' }} />
          </button>
        </form>
      </div>
    </section>
  );
}

SectionInput.propTypes = {
  id: PropTypes.number.isRequired,
  setActualMessages: PropTypes.func.isRequired,
};
