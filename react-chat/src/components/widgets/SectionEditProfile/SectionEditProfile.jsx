import { useId, useState, useEffect, useRef } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styles from './sectionEditProfile.module.scss';
import { validateField } from '../../../utils/validateField';
import { MIN_VALID_LENGTH_USER_NAME } from '../../../utils/variables';
import { useAuth } from '../../providers/helpers/useAuth';
import { successToast, rejectToast } from '../../../utils/toastes/toastes';

const API_URL = import.meta.env.VITE_API_URL;

export function SectionEditProfile({ currentUser }) {
  const { accessToken, refreshAccessToken } = useAuth();

  const refAvatarInput = useRef(null);

  const nameInputId = useId();
  const fioInputId = useId();
  const userNameInputId = useId();
  const bioTextAreaId = useId();

  const [id, setId] = useState('');

  const [avatarPreview, setAvatarPreview] = useState('');

  const [formIsChanged, setFormIsChanged] = useState(false);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    avatar: null,
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    username: '',
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
    if (textErrorFirstName || textErrorLastName || textErrorUserName) {
      setErrors((prev) => ({
        ...prev,
        firstname: textErrorFirstName,
        lastname: textErrorLastName,
        username: textErrorUserName,
      }));
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e, retryCount = 1) => {
    e.preventDefault();
    if (isLoading) return;
    if (!formIsChanged) {
      rejectToast('Вы не внесли изменений.');
      return;
    }
    setIsLoading(true);
    const isValid = validateFields();

    if (!isValid) {
      setIsLoading(false);

      return;
    }
    const formData = new FormData();
    const trimmedFirstName = data.firstname.trim();
    const trimmedLastName = data.lastname.trim();
    const trimmedUserName = data.username.trim();
    const trimmedBio = data.bio.trim();

    if (trimmedFirstName !== currentUser.firstname) {
      formData.append('first_name', trimmedFirstName);
    }
    if (trimmedLastName !== currentUser.lastname) {
      formData.append('last_name', trimmedLastName);
    }
    if (trimmedUserName !== currentUser.username) {
      formData.append('username', trimmedUserName);
    }
    if (trimmedBio !== currentUser.bio) {
      formData.append('bio', trimmedBio);
    }
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          const dataErrors = await response.json();
          const formattedErrors = Object.keys(dataErrors).reduce((acc, key) => {
            acc[key] = dataErrors[key].join('; ');
            return acc;
          }, {});
          setErrors(formattedErrors);
        }
        if (response.status === 401 && retryCount > 0) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            return handleSubmitForm(e, retryCount - 1);
          } else {
            throw new Error('Unable to refresh access token.');
          }
        } else {
          throw new Error(`Произошла ошибка ${response.status}`);
        }
      } else {
        successToast('Профиль успешно обновлен!');
        setFormIsChanged(false);
      }
    } catch (error) {
      console.error('Error:', error.message);
      rejectToast('Произошла ошибка. Данные не сохранены.');
    } finally {
      setIsLoading(false);
    }
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
    setFormIsChanged(true);
  };
  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrors((prev) => ({ ...prev, detail: null, [name]: null }));
    setData((prev) => ({ ...prev, detail: null, [name]: value }));
    setFormIsChanged(true);
  };

  const handleClickAvatarInput = () => {
    if (!refAvatarInput.current) return;
    refAvatarInput.current.click();
  };

  useEffect(() => {
    if (currentUser) {
      setId(currentUser.id || '');
      setAvatarPreview(currentUser.avatar || '');
      setData((prev) => ({ ...prev, firstname: currentUser.first_name }));
      setData((prev) => ({ ...prev, lastname: currentUser.last_name }));
      setData((prev) => ({ ...prev, username: currentUser.username }));
      setData((prev) => ({ ...prev, bio: currentUser.bio }));
    }
  }, [currentUser]);

  return (
    <section className={styles.section} tabIndex="-1">
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.fieldMoreContainer}>
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
          <div className={styles.containerForFirstName}>
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

          <div className={styles.containerForLastName}>
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
          Сохранить изменения
        </button>
      </form>
    </section>
  );
}
