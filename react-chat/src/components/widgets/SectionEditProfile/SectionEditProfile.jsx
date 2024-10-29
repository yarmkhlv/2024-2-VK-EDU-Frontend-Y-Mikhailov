import PropTypes from 'prop-types';
import styles from './sectionEditProfile.module.scss';
import { useEffect } from 'react';

export function SectionEditProfile({
  profile,
  fullNameRef,
  userNameRef,
  bioRef,
  errors,
  clearError,
}) {
  useEffect(() => {
    if (fullNameRef.current) fullNameRef.current.value = profile.fullName || '';
    if (userNameRef.current) userNameRef.current.value = profile.userName || '';
    if (bioRef.current) bioRef.current.value = profile.bio || '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.section} tabIndex="-1">
      <div className={styles.container}>
        <img
          className={styles.img}
          alt="Изображение профиля"
          src="https://images2.alphacoders.com/259/259300.jpg"
        />
        <div className={styles.fieldContainer}>
          <div className={styles.fieldName}>Фамилия и имя</div>
          <input
            ref={fullNameRef}
            className={styles.input}
            name="fullname"
            placeholder="Введите фамилию и имя"
            type="text"
          />
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.fieldName}>Имя пользователя</div>
          <input
            ref={userNameRef}
            className={styles.input}
            name="username"
            placeholder="Введите имя пользователя"
            type="text"
            onChange={() => {
              if (errors.userNameErrText) {
                clearError('userNameErrText');
              }
            }}
          />
          {errors.userNameErrText && (
            <div className={styles.errorText}>{errors.userNameErrText}</div>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.fieldName}>Биография</div>
          <textarea
            ref={bioRef}
            className={styles.textarea}
            rows={10}
            placeholder="Расскажите о себе"
          />
        </div>
      </div>
    </section>
  );
}

SectionEditProfile.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string,
    userName: PropTypes.string,
    bio: PropTypes.string,
  }),
  fullNameRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  userNameRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  bioRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  errors: PropTypes.shape({ userNameErrText: PropTypes.string }),
  clearError: PropTypes.func,
};
