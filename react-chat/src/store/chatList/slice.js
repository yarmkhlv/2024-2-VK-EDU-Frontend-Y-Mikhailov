import { createSlice } from '@reduxjs/toolkit';
import { fetchChatList, updateChatList, createPrivateChat } from './thunk';
const chatListSlice = createSlice({
  name: 'chatList',
  initialState: {
    chatList: [],
    nextPageUrl: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetChatState(state) {
      state.chatList = [];
      state.nextPageUrl = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        const { nextPageUrl, chats } = action.payload;
        state.chatList = chats;
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        if (action.payload === 'refresh-token') {
          state.error = 'Ошибка авторизации';
        } else {
          state.error = action.payload || 'Неизвестная ошибка';
        }
        state.isLoading = false;
      })
      .addCase(updateChatList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChatList.fulfilled, (state, action) => {
        const { nextPageUrl, chats } = action.payload;
        state.chatList = [...state.chatList, ...chats];
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(updateChatList.rejected, (state, action) => {
        if (action.payload === 'refresh-token') {
          state.error = 'Ошибка авторизации';
        } else {
          state.error = action.payload || 'Неизвестная ошибка';
        }
        state.isLoading = false;
      })
      .addCase(createPrivateChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPrivateChat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chatList.push(action.payload);
      })
      .addCase(createPrivateChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetChatState } = chatListSlice.actions;

export default chatListSlice.reducer;
