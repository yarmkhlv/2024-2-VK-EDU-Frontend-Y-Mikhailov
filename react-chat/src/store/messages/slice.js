import { createSlice } from '@reduxjs/toolkit';
import { getMessages, updateMessages } from './thunk';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    nextPageUrl: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetMessagesState(state) {
      state.messages = [];
      state.nextPageUrl = null;
      state.isLoading = false;
      state.error = null;
    },
    addMessage(state, action) {
      const message = action.payload;
      const isDuplicate = state.messages.some((msg) => msg.id === message.id);
      if (!isDuplicate) {
        state.messages.unshift(message);
      }
    },
    updateMessage(state, action) {
      const updatedMessage = action.payload;
      const index = state.messages.findIndex(
        (msg) => msg.id === updatedMessage.id
      );
      if (index !== -1) {
        state.messages[index] = updatedMessage;
      }
    },
    deleteMessage(state, action) {
      const messageId = action.payload;
      state.messages = state.messages.filter((msg) => msg.id !== messageId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const { newMessages, nextPageUrl } = action.payload;
        const existingIds = new Set(state.messages.map((msg) => msg.id));
        const filteredMessages = newMessages.filter(
          (msg) => !existingIds.has(msg.id)
        );
        state.messages = [...state.messages, ...filteredMessages];
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
        state.isLoading = false;
      })
      .addCase(updateMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        const { newMessages, nextPageUrl } = action.payload;
        const existingIds = new Set(state.messages.map((msg) => msg.id));
        const filteredMessages = newMessages.filter(
          (msg) => !existingIds.has(msg.id)
        );
        state.messages = [...state.messages, ...filteredMessages];
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(updateMessages.rejected, (state, action) => {
        if (action.payload === 'refresh-token') {
          state.error = 'Ошибка авторизации';
        } else {
          state.error = action.payload || 'Неизвестная ошибка';
        }
        state.isLoading = false;
      });
  },
});

export const { resetMessagesState, addMessage, updateMessage, deleteMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
