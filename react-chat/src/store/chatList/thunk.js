import { createAsyncThunk } from '@reduxjs/toolkit';
import { rejectToast } from '../../utils/toastes/toastes';
import { ENDPOINTS } from '../../utils/API/endpoints';
import { refreshTokens } from '../auth/thunk';
import { successToast } from '../../utils/toastes/toastes';

const IS_ALREADY_EXIST = 'Private chat with these members already exists';

export const fetchChatList = createAsyncThunk(
  'chatList/fetchChatList',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;
    let retryCount = 1;

    try {
      let response = await fetch(ENDPOINTS.CHAT_LIST, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const refreshResponse = await dispatch(refreshTokens()).unwrap();
          if (refreshResponse.access && refreshResponse.refresh) {
            retryCount--;
            response = await fetch(ENDPOINTS.CHAT_LIST, {
              headers: {
                Authorization: `Bearer ${refreshResponse.access}`,
              },
            });
          } else {
            throw new Error('Ошибка обновления токенов');
          }
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      }

      const data = await response.json();
      return {
        chats: data.results,
        nextPageUrl: data.next,
      };
    } catch (error) {
      if (error.message === 'refresh-token') {
        return rejectWithValue('refresh-token error');
      }
      rejectToast('Не удалось загрузить предыдущие чаты.');
      return rejectWithValue(error.message);
    }
  }
);

export const updateChatList = createAsyncThunk(
  'chatList/updateChatList',
  async (nextPageUrl, { rejectWithValue, getState, dispatch }) => {
    if (!nextPageUrl) return;
    const state = getState();
    const accessToken = state.auth.accessToken;
    let retryCount = 1;

    try {
      let response = await fetch(nextPageUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const refreshResponse = await dispatch(refreshTokens()).unwrap();
          if (refreshResponse.access && refreshResponse.refresh) {
            retryCount--;
            response = await fetch(nextPageUrl, {
              headers: {
                Authorization: `Bearer ${refreshResponse.access}`,
              },
            });
          } else {
            throw new Error('Ошибка обновления токенов');
          }
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      }

      const data = await response.json();
      return {
        chats: data.results,
        nextPageUrl: data.next,
      };
    } catch (error) {
      if (error.message === 'refresh-token') {
        return rejectWithValue('refresh-token error');
      }
      rejectToast('Не удалось загрузить предыдущие чаты.');
      return rejectWithValue(error.message);
    }
  }
);

export const createPrivateChat = createAsyncThunk(
  'chat/createPrivateChat',
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;
    let retryCount = 1;

    try {
      let response = await fetch(ENDPOINTS.CHAT_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_private: true, members: [userId] }),
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const refreshResponse = await dispatch(refreshTokens()).unwrap();
          if (refreshResponse.access && refreshResponse.refresh) {
            retryCount--;
            response = await fetch(ENDPOINTS.CHAT_LIST, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshResponse.access}`,
              },
              body: JSON.stringify({ is_private: true, members: [userId] }),
            });
          } else {
            throw new Error('Ошибка обновления токенов');
          }
        } else if (response.status === 400) {
          const errorData = await response.json();
          if (errorData[0] === IS_ALREADY_EXIST) {
            return rejectWithValue(IS_ALREADY_EXIST);
          } else {
            throw new Error(`Ошибка ${response.status}`);
          }
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      }

      const data = await response.json();
      successToast('Чат успешно создан.', 3000);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
