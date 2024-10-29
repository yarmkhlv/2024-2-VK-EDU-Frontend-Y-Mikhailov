import { useState, useRef } from 'react';
import { Loader } from '../components/shared/Loader/Loader';
import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';
import { SectionEditProfile } from '../components/widgets/SectionEditProfile/SectionEditProfile';
import { getProfileFromLS } from '../utils/getProfileFromLS';
import { delay } from '../utils/delay';

export function EditProfile() {
  const profileInfo = getProfileFromLS();
  const inputFullNameRef = useRef(null);
  const inputUserNameRef = useRef(null);
  const textAreaBioRef = useRef(null);
  const [errors, setErrors] = useState({ userNameErrText: '' });
  const [loadingStatus, setLoadingStatus] = useState(null);

  const validateFields = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inputUserNameRef.current.value.length > 4) {
          resolve(true);
        } else {
          setErrors((prev) => ({
            ...prev,
            userNameErrText: 'Имя пользователя должно быть больше 4 символов',
          }));
          reject(false);
        }
      }, 1000);
    });
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
        fullName: inputFullNameRef.current.value,
        userName: inputUserNameRef.current.value,
        bio: textAreaBioRef.current.value,
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
          profile={profileInfo}
          fullNameRef={inputFullNameRef}
          userNameRef={inputUserNameRef}
          bioRef={textAreaBioRef}
          errors={errors}
          clearError={clearError}
        />
      </main>
      <Loader status={loadingStatus} />
    </>
  );
}
