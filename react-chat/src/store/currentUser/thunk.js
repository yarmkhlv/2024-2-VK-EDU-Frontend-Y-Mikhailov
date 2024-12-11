import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINTS } from '../../utils/API/endpoints';
import { refreshTokens } from '../auth/thunk';

export const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchCurrentUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    try {
      const response = await fetch(ENDPOINTS.CURRENT_USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newTokens = await dispatch(refreshTokens()).unwrap();
          if (newTokens && newTokens.access) {
            const retryResponse = await fetch(ENDPOINTS.CURRENT_USER, {
              headers: {
                Authorization: `Bearer ${newTokens.access}`,
              },
            });
            if (!retryResponse.ok)
              throw new Error('Ошибка при повторном запросе');
            return await retryResponse.json();
          } else {
            throw new Error('Не удалось обновить токен');
          }
        }
        throw new Error(`Ошибка: статус ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || 'Ошибка загрузки данных пользователя'
      );
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'currentUser/updateCurrentUser',
  async ({ id, formData }, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;
    try {
      const response = await fetch(ENDPOINTS.EDIT_CURRENT_USER(id), {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newTokens = await dispatch(refreshTokens()).unwrap();
          if (newTokens && newTokens.access) {
            const retryResponse = await fetch(ENDPOINTS.EDIT_CURRENT_USER(id), {
              method: 'PATCH',
              body: formData,
              headers: {
                Authorization: `Bearer ${newTokens.access}`,
              },
            });
            if (!retryResponse.ok)
              throw new Error('Ошибка при повторном запросе');
            const updatedData = await retryResponse.json();
            return updatedData;
          } else {
            throw new Error('Не удалось обновить токен');
          }
        }
        throw new Error(`Ошибка: статус ${response.status}`);
      }

      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
