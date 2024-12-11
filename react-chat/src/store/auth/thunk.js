import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearTokens } from './slice';
import { rejectToast } from '../../utils/toastes/toastes';
import { ENDPOINTS } from '../../utils/API/endpoints';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userLoginData, { rejectWithValue }) => {
    const { username, password } = userLoginData;

    try {
      const response = await fetch(ENDPOINTS.AUTHORIZATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const dataError = await response.json();
        return rejectWithValue(dataError);
      }

      const data = await response.json();
      const { access, refresh } = data;

      return { access, refresh };
    } catch {
      rejectToast('Не удалось авторизоваться, попробуйте позже.');
      return rejectWithValue('Не удалось авторизоваться, попробуйте позже.');
    }
  }
);

export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      return rejectWithValue('Отсутствует refresh токен');
    }

    try {
      const response = await fetch(ENDPOINTS.AUTH_REFRESH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления токенов');
      }

      const data = await response.json();
      const { access, refresh } = data;

      return { access, refresh };
    } catch (err) {
      console.error('Token refresh error:', err);
      dispatch(clearTokens());
      return rejectWithValue('Ошибка обновления токенов');
    }
  }
);
