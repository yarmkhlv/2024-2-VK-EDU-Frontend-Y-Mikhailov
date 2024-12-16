const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  CURRENT_USER: API_URL + '/user/current/',
  EDIT_CURRENT_USER: (id) => API_URL + `/user/${id}`,
  AUTHORIZATION: API_URL + '/auth/',
  REGISTER: API_URL + '/register/',
  AUTH_REFRESH: API_URL + '/auth/refresh/',
  CHAT_LIST: API_URL + '/chats/?page_size=10',
  CHAT: (id) => API_URL + `/chat/${id}`,
  USER_LIST: API_URL + `/users/?page_size=20`,
  MESSAGES: (id) => API_URL + `/messages?chat=${id}&page=1&page_size=25`,
  CENTRIFUGO: {
    CONNECT: API_URL + '/centrifugo/connect/',
    SUBSCRIBE: API_URL + '/centrifugo/subscribe/',
  },
  CONNECTION_WEBSOCKET: 'wss://vkedu-fullstack-div2.ru/connection/websocket/',
};
