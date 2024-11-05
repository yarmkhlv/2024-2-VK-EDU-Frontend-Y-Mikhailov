import PropTypes from 'prop-types';
import styles from './sectionEditProfile.module.scss';
import { useId } from 'react';

export function SectionEditProfile({
  firstName,
  lastName,
  userName,
  bio,
  handleChangeFirstName,
  handleChangeLastName,
  handleChangeUserName,
  handleChangeBio,
  errors,
}) {
  const nameInputId = useId();
  const fioInputId = useId();
  const userNameInputId = useId();
  const bioTextAreaId = useId();

  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <img
          className={styles.img}
          alt="Изображение профиля"
          src="https://images2.alphacoders.com/259/259300.jpg"
        />
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
            name="fullname"
            placeholder="Введите имя"
            type="text"
          />
          {errors.firstNameErrText && (
            <div className={styles.errorText}>{errors.firstNameErrText}</div>
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
            name="fullname"
            placeholder="Введите фамилию"
            type="text"
          />
          {errors.lastNameErrText && (
            <div className={styles.errorText}>{errors.lastNameErrText}</div>
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
          {errors.userNameErrText ? (
            <div className={styles.errorText}>{errors.userNameErrText}</div>
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
            value={bio}
            onChange={handleChangeBio}
            className={styles.textarea}
            rows={10}
            placeholder="Расскажите о себе"
          />
          {errors.bioErrText && (
            <div className={styles.errorText}>{errors.bioErrText}</div>
          )}
        </div>
      </div>
    </section>
  );
}

SectionEditProfile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userName: PropTypes.string,
  bio: PropTypes.string,
  handleChangeFirstName: PropTypes.func,
  handleChangeLastName: PropTypes.func,
  handleChangeUserName: PropTypes.func,
  handleChangeBio: PropTypes.func,
  errors: PropTypes.shape({
    userNameErrText: PropTypes.string,
    firstNameErrText: PropTypes.string,
    lastNameErrText: PropTypes.string,
    bioErrText: PropTypes.string,
  }),
};
