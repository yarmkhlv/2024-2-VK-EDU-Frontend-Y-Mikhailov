import { useState } from 'react';
import { Loader } from '../components/shared/Loader/Loader';
import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';
import { SectionEditProfile } from '../components/widgets/SectionEditProfile/SectionEditProfile';
import { getProfileFromLS } from '../utils/getProfileFromLS';
import { delay } from '../utils/delay';
import {
  VALID_LENGTH_FIRST_NAME,
  VALID_LENGTH_LAST_NAME,
  VALID_LENGTH_USER_NAME,
  VALID_LENGTH_BIO,
} from '../utils/variables';

export function EditProfile() {
  const profileInfo = getProfileFromLS();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({ userNameErrText: '' });
  const [loadingStatus, setLoadingStatus] = useState(null);

  const validateFields = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const trimmedFirstNameLength = firstName.trim().length;
        const trimmedLastNameLength = lastName.trim().length;
        const trimmedUserNameLength = userName.trim().length;
        const trimmedBioLength = bio.trim().length;
        const isValidFirstName =
          trimmedFirstNameLength > 0 &&
          trimmedFirstNameLength <= VALID_LENGTH_FIRST_NAME;
        const isValidLastName =
          trimmedLastNameLength > 0 &&
          trimmedLastNameLength <= VALID_LENGTH_LAST_NAME;
        const isValidUserName =
          trimmedUserNameLength > 0 &&
          trimmedUserNameLength <= VALID_LENGTH_USER_NAME;
        const isValidBio =
          trimmedBioLength > 0 && trimmedBioLength <= VALID_LENGTH_BIO;
        if (
          isValidFirstName &&
          isValidLastName &&
          isValidUserName &&
          isValidBio
        ) {
          resolve(true);
        } else {
          if (!isValidUserName) {
            setErrors((prev) => ({
              ...prev,
              userNameErrText:
                'Имя пользователя должно быть больше 4 символов и не более 150',
            }));
          }
          if (!isValidFirstName) {
            setErrors((prev) => ({
              ...prev,
              firstNameErrText:
                'Имя  должно состоять минимум из 1 символа и не более 150',
            }));
          }
          if (!isValidLastName) {
            setErrors((prev) => ({
              ...prev,
              lastNameErrText:
                'Фамилия  должна состоять минимум из 1 символа и не более 150',
            }));
          }
          if (!isValidBio) {
            setErrors((prev) => ({
              ...prev,
              bioErrText:
                'Биография должна состоять минимум из 1 символа и не более 450',
            }));
          }
          reject(false);
        }
      }, 1000);
    });
  };

  const handleChangeFirstName = (e) => {
    clearError('firstNameErrText');
    setFirstName(e.currentTarget.value);
  };
  const handleChangeLastName = (e) => {
    clearError('lastNameErrText');
    setLastName(e.currentTarget.value);
  };
  const handleChangeUserName = (e) => {
    clearError('userNameErrText');
    setUserName(e.currentTarget.value);
  };
  const handleChangeBio = (e) => {
    clearError('bioErrText');
    setBio(e.currentTarget.value);
  };

  const clearError = (fieldName) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  };

  const saveProfile = async () => {
    try {
      setLoadingStatus('loading');
      await validateFields();

      setLoadingStatus('done');

      await delay(1000);
      const newProfileData = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        bio: bio,
      };
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...profileInfo, ...newProfileData })
      );
    } catch {
      setLoadingStatus('reject');

      await delay(1000);
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <>
      <HeaderEditProfile saveProfile={saveProfile} />
      <main className="main">
        <SectionEditProfile
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          bio={bio}
          handleChangeFirstName={handleChangeFirstName}
          handleChangeLastName={handleChangeLastName}
          handleChangeUserName={handleChangeUserName}
          handleChangeBio={handleChangeBio}
          errors={errors}
        />
      </main>
      <Loader status={loadingStatus} />
    </>
  );
}
