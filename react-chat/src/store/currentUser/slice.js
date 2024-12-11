import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, updateCurrentUser } from './thunk';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCurrentUserState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
        state.isLoading = false;
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.isLoading = false;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
        state.isLoading = false;
      });
  },
});

export const { resetCurrentUserState } = currentUserSlice.actions;
export default currentUserSlice.reducer;
