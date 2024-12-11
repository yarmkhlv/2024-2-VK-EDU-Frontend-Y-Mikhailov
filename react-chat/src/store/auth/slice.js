import { createSlice } from '@reduxjs/toolkit';
import { loginUser, refreshTokens } from './thunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    status: null,
    error: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.error = null;
        sessionStorage.setItem('accessToken', action.payload.access);
        sessionStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.detail || 'Ошибка авторизации';
      })
      .addCase(refreshTokens.pending, (state) => {
        state.status = 'refreshing';
        state.error = null;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.error = null;
        sessionStorage.setItem('accessToken', action.payload.access);
        sessionStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Ошибка обновления токенов';
      });
  },
});

export const { setRefreshToken, clearTokens, clearAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
