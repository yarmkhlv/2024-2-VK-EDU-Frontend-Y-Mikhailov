import { useId, useState, useRef } from 'react';
import { rejectToast, successToast } from '../../../utils/toastes/toastes';
import { useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { validateField } from '../../../utils/validateField';
import { MIN_VALID_LENGTH_USER_NAME } from '../../../utils/variables';
import styles from './sectionCreateUser.module.scss';
import { ENDPOINTS } from '../../../utils/API/endpoints';

export function SectionCreateUser() {
  const navigate = useNavigate();

  const refAvatarInput = useRef(null);

  const nameInputId = useId();
  const fioInputId = useId();
  const userNameInputId = useId();
  const passwordInputId = useId();
  const bioTextAreaId = useId();

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    bio: '',
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState('');

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    bio: '',
    avatar: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    const textErrorFirstName = validateField(data.firstname, true);
    const textErrorLastName = validateField(data.lastname, true);
    const textErrorUserName = validateField(
      data.username,
      true,
      MIN_VALID_LENGTH_USER_NAME
    );
    const textErrorPassword = validateField(data.password, true);
    if (
      textErrorFirstName ||
      textErrorLastName ||
      textErrorUserName ||
      textErrorPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        firstname: textErrorFirstName,
        lastname: textErrorLastName,
        username: textErrorUserName,
        password: textErrorPassword,
      }));
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    const isValid = validateFields();

    if (!isValid) return;
    setIsLoading(false);
    const formData = new FormData();
    formData.append('first_name', data.firstname.trim());
    formData.append('last_name', data.lastname.trim());
    formData.append('username', data.username.trim());
    formData.append('password', data.password.trim());

    if (data.bio) {
      formData.append('bio', data.bio);
    }
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 400) {
          const dataErrors = await response.json();
          if (Array.isArray(dataErrors)) {
            throw new Error(`${dataErrors[0]}`);
          }
          const formattedErrors = Object.keys(dataErrors).reduce((acc, key) => {
            acc[key] = dataErrors[key].join('; ');
            return acc;
          }, {});
          setErrors(formattedErrors);
        } else {
          throw new Error(`Произошла ошибка ${response.status}`);
        }
      } else {
        successToast('Пользователь успешно создан');
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.message === 'Failed to fetch') {
        rejectToast('Не удалось создать пользователя, попробуйте позже.');
      } else {
        rejectToast(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, detail: null, [name]: null }));
    setData((prev) => ({ ...prev, detail: null, [name]: value }));
  };

  const handleChangeAvatar = (e) => {
    setErrors((prev) => ({ ...prev, avatar: null }));
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview('');
    }
  };

  const handleClickAvatarInput = () => {
    if (!refAvatarInput.current) return;
    refAvatarInput.current.click();
  };

  return (
    <section className={styles.section} tabIndex="-1">
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.fieldContainer}>
          <div className={styles.avatarPreview}>
            {avatarPreview ? (
              <div
                className={styles.containerPreviewImage}
                onClick={handleClickAvatarInput}
              >
                <img
                  tabIndex={0}
                  src={avatarPreview}
                  alt="Предпросмотр аватара"
                  className={styles.avatarImage}
                />
                <AddAPhotoIcon
                  className={styles.addPhotoIcon}
                  sx={{
                    color: '#fff',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                    zIndex: '2',
                  }}
                />
              </div>
            ) : (
              <div
                onClick={handleClickAvatarInput}
                tabIndex={0}
                className={styles.defaultPreviewAvatar}
              >
                <AddAPhotoIcon sx={{ color: '#837d7d' }} />
                <p className={styles.previewAvatarText}>Добавить изображение</p>
              </div>
            )}
          </div>
          <input
            ref={refAvatarInput}
            onChange={handleChangeAvatar}
            className={styles.avatarInput}
            name="avatar"
            type="file"
            accept="image/*"
          />
          {errors.avatar && (
            <div className={styles.errorText}>{errors.avatar}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={nameInputId} className={styles.fieldName}>
            Имя*
          </label>
          <input
            id={nameInputId}
            value={data.firstname}
            onChange={handleChangeInput}
            autoComplete="false"
            className={styles.input}
            name="firstname"
            placeholder="Введите имя"
            type="text"
          />
          {errors.firstname && (
            <div className={styles.errorText}>{errors.firstname}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={fioInputId} className={styles.fieldName}>
            Фамилия*
          </label>
          <input
            id={fioInputId}
            value={data.lastname}
            onChange={handleChangeInput}
            autoComplete="false"
            className={styles.input}
            name="lastname"
            placeholder="Введите фамилию"
            type="text"
          />
          {errors.lastname && (
            <div className={styles.errorText}>{errors.lastname}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor={userNameInputId} className={styles.fieldName}>
            Имя пользователя*
          </label>
          <input
            id={userNameInputId}
            value={data.username}
            className={styles.input}
            autoComplete="false"
            name="username"
            placeholder="Введите имя пользователя"
            type="text"
            onChange={handleChangeInput}
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
            value={data.password}
            className={styles.input}
            autoComplete="false"
            name="password"
            placeholder="Введите пароль"
            type="password"
            onChange={handleChangeInput}
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
            value={data.bio}
            name="bio"
            onChange={handleChangeInput}
            className={styles.textarea}
            rows={3}
            placeholder="Расскажите о себе"
          />
          {errors.bio && <div className={styles.errorText}>{errors.bio}</div>}
        </div>
        <button className={styles.submitBtn} type="submit">
          Создать аккаунт
        </button>
      </form>
    </section>
  );
}
