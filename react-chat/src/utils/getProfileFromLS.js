const DEFAULT_PROFILE = {
  imgUrl: '',
  fullName: '',
  userName: '',
  bio: '',
};

export const getProfileFromLS = () => {
  return JSON.parse(localStorage.getItem('profile')) || DEFAULT_PROFILE;
};
