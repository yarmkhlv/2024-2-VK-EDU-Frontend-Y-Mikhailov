import { useId, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurrentUser,
  updateCurrentUser,
} from '../../../store/currentUser/thunk';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styles from './sectionEditProfile.module.scss';
import { validateField } from '../../../utils/validateField';
import { MIN_VALID_LENGTH_USER_NAME } from '../../../utils/variables';
import { successToast, rejectToast } from '../../../utils/toastes/toastes';

export function SectionEditProfile() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.currentUser);
  const refAvatarInput = useRef(null);

  const nameInputId = useId();
  const fioInputId = useId();
  const userNameInputId = useId();
  const bioTextAreaId = useId();

  const [id, setId] = useState('');

  const [avatarPreview, setAvatarPreview] = useState('');

  const [formIsChanged, setFormIsChanged] = useState(false);

  const [currentUserEditor, setCurrentUserEditor] = useState({
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

  const validateFields = () => {
    const textErrorFirstName = validateField(currentUserEditor.firstname, true);
    const textErrorLastName = validateField(currentUserEditor.lastname, true);
    const textErrorUserName = validateField(
      currentUserEditor.username,
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!formIsChanged) {
      rejectToast('Вы не внесли изменений.');
      return;
    }
    const isValid = validateFields();

    if (!isValid) {
      return;
    }
    const formData = new FormData();
    const trimmedFirstName = currentUserEditor.firstname.trim();
    const trimmedLastName = currentUserEditor.lastname.trim();
    const trimmedUserName = currentUserEditor.username.trim();
    const trimmedBio = currentUserEditor.bio.trim();

    if (trimmedFirstName !== data.firstname) {
      formData.append('first_name', trimmedFirstName);
    }
    if (trimmedLastName !== data.lastname) {
      formData.append('last_name', trimmedLastName);
    }
    if (trimmedUserName !== data.username) {
      formData.append('username', trimmedUserName);
    }
    if (trimmedBio !== data.bio) {
      formData.append('bio', trimmedBio);
    }
    if (currentUserEditor.avatar) {
      formData.append('avatar', currentUserEditor.avatar);
    }

    try {
      const resultAction = await dispatch(updateCurrentUser({ id, formData }));

      if (updateCurrentUser.fulfilled.match(resultAction)) {
        successToast('Профиль успешно обновлен!');
        setFormIsChanged(false);
      } else {
        const error =
          resultAction.payload || 'Произошла ошибка. Данные не сохранены.';
        rejectToast(error);
        if (resultAction.payload && typeof resultAction.payload === 'object') {
          setErrors(resultAction.payload);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      rejectToast('Произошла ошибка. Данные не сохранены.');
    }
  };

  const handleChangeAvatar = (e) => {
    setErrors((prev) => ({ ...prev, avatar: null }));
    const file = e.target.files[0];
    if (file) {
      setCurrentUserEditor((prev) => ({ ...prev, avatar: file }));
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
    setCurrentUserEditor((prev) => ({ ...prev, detail: null, [name]: value }));
    setFormIsChanged(true);
  };

  const handleClickAvatarInput = () => {
    if (!refAvatarInput.current) return;
    refAvatarInput.current.click();
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchCurrentUser());
    } else {
      setId(data.id || '');
      setAvatarPreview(data.avatar || '');
      setCurrentUserEditor({
        firstname: data.first_name || '',
        lastname: data.last_name || '',
        username: data.username || '',
        bio: data.bio || '',
        avatar: null,
      });
    }
  }, [dispatch, data]);

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
              value={currentUserEditor.firstname}
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
              value={currentUserEditor.lastname}
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
            value={currentUserEditor.username}
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
            value={currentUserEditor.bio}
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
