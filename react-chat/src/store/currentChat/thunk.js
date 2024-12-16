import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshTokens } from '../auth/thunk';
import { ENDPOINTS } from '../../utils/API/endpoints';

export const getInfoChat = createAsyncThunk(
  'currentChat/getInfoChat',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    let retryCount = 1;

    try {
      let response = await fetch(ENDPOINTS.CHAT(id), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && retryCount > 0) {
          const refreshResponse = await dispatch(refreshTokens()).unwrap();
          if (refreshResponse.access) {
            retryCount--;
            response = await fetch(ENDPOINTS.CHAT(id), {
              headers: {
                Authorization: `Bearer ${refreshResponse.access}`,
              },
            });
          } else {
            throw new Error('Unable to refresh access token');
          }
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
