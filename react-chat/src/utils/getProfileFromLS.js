const DEFAULT_PROFILE = {
  imgUrl: '',
  first_name: '',
  full_name: '',
  username: '',
  bio: '',
};

export const getProfileFromLS = () => {
  return JSON.parse(localStorage.getItem('profile')) || DEFAULT_PROFILE;
};
