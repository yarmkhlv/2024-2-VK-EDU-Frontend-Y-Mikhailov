import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/helpers/useAuth';
import styles from './sectionLogin.module.scss';

export function SectionLogin() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const userNameInputId = useId();
  const passwordInputId = useId();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleChangeUserName = (e) => {
    if (errorText) setErrorText('');
    setUserName(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    if (errorText) setErrorText('');
    setPassword(e.currentTarget.value);
  };
  const handleClickBtnCreate = async (e) => {
    e.preventDefault();

    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch(
        'https://vkedu-fullstack-div2.ru/api/auth/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: trimmedUserName,
            password: trimmedPassword,
          }),
        }
      );

      if (!response.ok) {
        const dataError = await response.json();
        const formattedTextError = Object.values(dataError).join('; ');
        setErrorText(formattedTextError);
        throw new Error(`Ошибка ${response.status}`);
      } else {
        const data = await response.json();
        const { access, refresh } = data;
        setTokens(access, refresh);
        navigate('/chatlist');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    return () => {
      window.history.replaceState({}, '');
    };
  }, []);

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.fieldContainer}>
            <label htmlFor={userNameInputId} className={styles.fieldName}>
              Логин
            </label>
            <input
              id={userNameInputId}
              value={userName}
              onChange={handleChangeUserName}
              autoComplete="false"
              className={styles.input}
              name="fullname"
              placeholder="Введите имя пользователя"
              type="text"
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={passwordInputId} className={styles.fieldName}>
              Пароль
            </label>
            <input
              id={passwordInputId}
              value={password}
              onChange={handleChangePassword}
              autoComplete="false"
              className={styles.input}
              name="fullname"
              placeholder="Введите пароль"
              type="password"
            />
          </div>
          {errorText && <div className={styles.errorText}>{errorText}</div>}
          <div className={styles.btnBlock}>
            <button
              className={styles.btn}
              onClick={handleClickBtnCreate}
              type="submit"
            >
              Войти
            </button>
            <Link to="/createuser" className={styles.btn}>
              Создать аккаунт
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
