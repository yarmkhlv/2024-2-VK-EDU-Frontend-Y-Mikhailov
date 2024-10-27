import { useRef } from 'react';
import { updMessagesAtLocalStorage, makeAnswerMessage } from './helpers';
import styles from './sectionInput.module.scss';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';

export function SectionInput({ id, setActualMessages }) {
  const inputRef = useRef(null);
  const recordNewMessage = () => {
    const trimmedText = inputRef.current.value.trim();
    const newMessage = {
      text: trimmedText,
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

    if (!inputRef.current.value.trim()) return;

    recordNewMessage();
    recordNewMessageFromAnotherUser();

    inputRef.current.value = '';
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
            ref={inputRef}
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
