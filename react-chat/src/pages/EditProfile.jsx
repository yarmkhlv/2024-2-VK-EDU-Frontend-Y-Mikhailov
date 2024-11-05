import { useState } from 'react';
import { Loader } from '../components/shared/Loader/Loader';
import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';
import { SectionEditProfile } from '../components/widgets/SectionEditProfile/SectionEditProfile';
import { getProfileFromLS } from '../utils/getProfileFromLS';
import { delay } from '../utils/delay';
import {
  MIN_VALID_LENGTH_USER_NAME,
  MAX_VALID_LENGTH_FIRST_NAME,
  MAX_VALID_LENGTH_LAST_NAME,
  MAX_VALID_LENGTH_USER_NAME,
  MAX_VALID_LENGTH_BIO,
} from '../utils/variables';
import { validateField } from '../utils/validateField';

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
        const textErrorFirstName = validateField(
          firstName,
          null,
          MAX_VALID_LENGTH_FIRST_NAME,
          true
        );
        const textErrorLastName = validateField(
          lastName,
          null,
          MAX_VALID_LENGTH_LAST_NAME,
          true
        );
        const textErrorUserName = validateField(
          userName,
          MIN_VALID_LENGTH_USER_NAME,
          MAX_VALID_LENGTH_USER_NAME,
          true
        );
        const textErrorBio = validateField(
          bio,
          null,
          MAX_VALID_LENGTH_BIO,
          false
        );
        if (
          !textErrorFirstName &&
          !textErrorLastName &&
          !textErrorUserName &&
          !textErrorBio
        ) {
          resolve(true);
        } else {
          if (textErrorUserName) {
            setErrors((prev) => ({
              ...prev,
              userNameErrText: textErrorUserName,
            }));
          }
          if (textErrorFirstName) {
            setErrors((prev) => ({
              ...prev,
              firstNameErrText: textErrorFirstName,
            }));
          }
          if (textErrorUserName) {
            setErrors((prev) => ({
              ...prev,
              lastNameErrText: textErrorLastName,
            }));
          }
          if (textErrorBio) {
            setErrors((prev) => ({
              ...prev,
              bioErrText: textErrorBio,
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
