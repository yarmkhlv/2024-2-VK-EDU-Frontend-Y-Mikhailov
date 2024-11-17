import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../shared/Loader/Loader';
import { validateField } from '../../../utils/validateField';
import { MIN_VALID_LENGTH_USER_NAME } from '../../../utils/variables';
import styles from './sectionCreateUser.module.scss';

export function SectionCreateUser() {
  const navigate = useNavigate();

  const avatarInputId = useId();
  const nameInputId = useId();
  const fioInputId = useId();
  const userNameInputId = useId();
  const passwordInputId = useId();
  const bioTextAreaId = useId();

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    avatar: '',
  });

  const [statusLoading, setStatusLoading] = useState(null);

  const validateFields = () => {
    const textErrorFirstName = validateField(firstName, true);
    const textErrorLastName = validateField(lastName, true);
    const textErrorUserName = validateField(
      userName,
      true,
      MIN_VALID_LENGTH_USER_NAME
    );
    if (textErrorFirstName || textErrorLastName || textErrorUserName) {
      setErrors((prev) => ({
        ...prev,
        first_name: textErrorFirstName,
        last_name: textErrorLastName,
        username: textErrorUserName,
      }));
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (!isValid) return;
    setStatusLoading('loading');
    const formData = new FormData();
    formData.append('first_name', firstName.trim());
    formData.append('last_name', lastName.trim());
    formData.append('username', userName.trim());
    formData.append('password', password.trim());

    if (bio) {
      formData.append('bio', bio);
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await fetch(
        'https://vkedu-fullstack-div2.ru/api/register/',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          const dataErrors = await response.json();
          const formattedErrors = Object.keys(dataErrors).reduce((acc, key) => {
            acc[key] = dataErrors[key].join('; ');
            return acc;
          }, {});
          setStatusLoading('reject');
          setTimeout(() => {
            setErrors(formattedErrors);
            setStatusLoading(null);
          }, 1000);
        } else {
          throw new Error(`Произошла ошибка ${response.status}`);
        }
      } else {
        setStatusLoading('done');
        setTimeout(() => {
          setStatusLoading(null);
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleChangeAvatar = (e) => {
    clearError('avatar');
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview('');
    }
  };
  const handleChangeFirstName = (e) => {
    clearError('first_name');
    setFirstName(e.currentTarget.value);
  };
  const handleChangeLastName = (e) => {
    clearError('last_name');
    setLastName(e.currentTarget.value);
  };
  const handleChangeUserName = (e) => {
    clearError('username');
    setUserName(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    clearError('password');
    setPassword(e.currentTarget.value);
  };
  const handleChangeBio = (e) => {
    clearError('bio');
    setBio(e.currentTarget.value);
  };

  const clearError = (fieldName) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  };

  return (
    <section className={styles.section} tabIndex="-1">
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.fieldContainer}>
          <label htmlFor={nameInputId} className={styles.fieldName}>
            Имя*
          </label>
          <input
            id={nameInputId}
            value={firstName}
            onChange={handleChangeFirstName}
            autoComplete="false"
            className={styles.input}
            name="firstname"
            placeholder="Введите имя"
            type="text"
          />
          {errors.first_name && (
            <div className={styles.errorText}>{errors.first_name}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={fioInputId} className={styles.fieldName}>
            Фамилия*
          </label>
          <input
            id={fioInputId}
            value={lastName}
            onChange={handleChangeLastName}
            autoComplete="false"
            className={styles.input}
            name="lastname"
            placeholder="Введите фамилию"
            type="text"
          />
          {errors.last_name && (
            <div className={styles.errorText}>{errors.last_name}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={userNameInputId} className={styles.fieldName}>
            Имя пользователя*
          </label>
          <input
            id={userNameInputId}
            value={userName}
            className={styles.input}
            autoComplete="false"
            name="username"
            placeholder="Введите имя пользователя"
            type="text"
            onChange={handleChangeUserName}
          />
          {errors.username ? (
            <div className={styles.errorText}>{errors.username}</div>
          ) : (
            <div className={styles.recommendText}>
              Имя пользователя должно быть не менее 4 символов
            </div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={passwordInputId} className={styles.fieldName}>
            Пароль*
          </label>
          <input
            id={passwordInputId}
            value={password}
            className={styles.input}
            autoComplete="false"
            name="password"
            placeholder="Введите пароль"
            type="password"
            onChange={handleChangePassword}
          />
          {errors.password && (
            <div className={styles.errorText}>{errors.password}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={bioTextAreaId} className={styles.fieldName}>
            Биография
          </label>
          <textarea
            id={bioTextAreaId}
            value={bio}
            onChange={handleChangeBio}
            className={styles.textarea}
            rows={10}
            placeholder="Расскажите о себе"
          />
          {errors.bio && <div className={styles.errorText}>{errors.bio}</div>}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={avatarInputId} className={styles.fieldName}>
            Изображение профиля
          </label>
          {avatarPreview && (
            <div className={styles.avatarPreview}>
              <img
                src={avatarPreview}
                alt="Предпросмотр аватара"
                className={styles.avatarImage}
              />
            </div>
          )}
          <input
            id={avatarInputId}
            onChange={handleChangeAvatar}
            className={styles.input}
            name="avatar"
            type="file"
            accept="image/*"
          />
          {errors.avatar && (
            <div className={styles.errorText}>{errors.avatar}</div>
          )}
        </div>

        <button className={styles.submitBtn} type="submit">
          Создать аккаунт
        </button>
      </form>
      <Loader status={statusLoading} />
    </section>
  );
}
