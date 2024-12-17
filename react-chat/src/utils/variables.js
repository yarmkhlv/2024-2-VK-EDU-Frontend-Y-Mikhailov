export const MIN_VALID_LENGTH_USER_NAME = 4;

export const MAX_VALID_LENGTH_FIRST_NAME = 150;
export const MAX_VALID_LENGTH_LAST_NAME = 150;
export const MAX_VALID_LENGTH_USER_NAME = 150;
export const MAX_VALID_LENGTH_BIO = 450;

export const STATUS = {
  LOADING: 'loading',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const PAGES = {
  LOGIN: '/',
  CREATE_USER: '/createuser',
  EDIT_PROFILE: '/editprofile',
  CHAT_LIST: '/chatlist',
  CHAT: '/chat/:id',
  ERROR_PAGE: '/*',
};
