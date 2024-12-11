import { createSlice } from '@reduxjs/toolkit';
import { getInfoChat } from './thunk';

const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCurrentChatState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfoChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInfoChat.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getInfoChat.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
        state.isLoading = false;
      });
  },
});

export const { resetCurrentChatState } = currentChatSlice.actions;
export default currentChatSlice.reducer;
