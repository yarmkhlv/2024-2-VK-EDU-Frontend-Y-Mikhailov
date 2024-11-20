import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/helpers/useAuth';
import styles from './sectionLogin.module.scss';

const API_URL = import.meta.env.VITE_API_URL;

export function SectionLogin() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const userNameInputId = useId();
  const passwordInputId = useId();
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({
    login: null,
    password: null,
    detail: null,
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, detail: null, [name]: null }));
    setData((prev) => ({ ...prev, detail: null, [name]: value }));
  };

  const handleClickBtnCreate = async (e) => {
    e.preventDefault();

    const trimmedUserName = data.username.trim();
    const trimmedPassword = data.password.trim();

    try {
      const response = await fetch(`${API_URL}/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUserName,
          password: trimmedPassword,
        }),
      });

      if (!response.ok) {
        const dataError = await response.json();

        setErrors((prev) => ({ ...prev, ...dataError }));
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
              value={data.username}
              onChange={handleChangeInput}
              autoComplete="false"
              className={styles.input}
              name="username"
              placeholder="Введите имя пользователя"
              type="text"
            />
            {errors.username && (
              <div className={styles.errorText}>{errors.username}</div>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor={passwordInputId} className={styles.fieldName}>
              Пароль
            </label>
            <input
              id={passwordInputId}
              value={data.password}
              onChange={handleChangeInput}
              autoComplete="false"
              className={styles.input}
              name="password"
              placeholder="Введите пароль"
              type="password"
            />
            {errors.password && (
              <div className={styles.errorText}>{errors.password}</div>
            )}
          </div>
          {errors.detail && (
            <div className={styles.errorText}>{errors.detail}</div>
          )}
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
