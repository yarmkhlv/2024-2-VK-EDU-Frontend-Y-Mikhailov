import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './sectionLogin.module.scss';

export function SectionLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNameInputId = useId();
  const passwordInputId = useId();
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    detail: null,
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, detail: null, [name]: null }));
    setData((prev) => ({ ...prev, detail: null, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUserName = data.username.trim();
    const trimmedPassword = data.password.trim();

    try {
      const resultAction = await dispatch(
        loginUser({ username: trimmedUserName, password: trimmedPassword })
      );
      if (resultAction.meta.requestStatus === 'fulfilled') {
        navigate('/chatlist');
      } else {
        setErrors((prev) => ({ ...prev, ...resultAction.payload }));
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrors((prev) => ({ ...prev, detail: error.message }));
    }
  };

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
              aria-label="Кнопка авторизации пользователя"
              className={styles.btn}
              onClick={handleSubmit}
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
