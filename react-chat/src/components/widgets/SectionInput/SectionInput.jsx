import { useRef } from 'react';
import styles from './sectionInput.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../providers/helpers/useAuth';
import { useNavigate } from 'react-router-dom';

export function SectionInput({ id }) {
  const navigate = useNavigate();
  const { accessToken, refreshAccessToken } = useAuth();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    recordNewMessage();
  };

  const recordNewMessage = async (retryCount = 1) => {
    const trimmedText = inputRef.current.value.trim();
    if (!trimmedText) return;
    try {
      const response = await fetch(
        `https://vkedu-fullstack-div2.ru/api/messages/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            text: trimmedText,
            chat: id,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return recordNewMessage(id, retryCount - 1);
          } else {
            throw new Error(`Ошибка в создании токена`);
          }
        } else throw new Error(`Ошибка ${response.status}`);
      } else {
        inputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error:', error.message);
      navigate('/');
    }
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
