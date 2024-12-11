import { createAsyncThunk } from '@reduxjs/toolkit';
import { rejectToast } from '../../utils/toastes/toastes';
import { ENDPOINTS } from '../../utils/API/endpoints';
import { refreshTokens } from '../auth/thunk';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;
    let retryCount = 1;

    try {
      let response = await fetch(ENDPOINTS.MESSAGES(id), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const refreshResponse = await dispatch(refreshTokens()).unwrap();
          if (refreshResponse.access && refreshResponse.refresh) {
            retryCount--;
            response = await fetch(ENDPOINTS.MESSAGES(id), {
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
        newMessages: data.results,
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

export const updateMessages = createAsyncThunk(
  'messages/updateMessages',
  async (nextPageUrl, { rejectWithValue, getState, dispatch }) => {
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
        newMessages: data.results,
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
