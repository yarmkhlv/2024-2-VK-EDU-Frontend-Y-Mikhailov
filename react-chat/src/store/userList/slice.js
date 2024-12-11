import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList, updateUserList } from './thunk';
const chatListSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: [],
    nextPageUrl: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetUserListState(state) {
      state.userList = [];
      state.nextPageUrl = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        const { nextPageUrl, users } = action.payload;
        state.userList = users;
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        if (action.payload === 'refresh-token') {
          state.error = 'Ошибка авторизации';
        } else {
          state.error = action.payload || 'Неизвестная ошибка';
        }
        state.isLoading = false;
      })
      .addCase(updateUserList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserList.fulfilled, (state, action) => {
        const { nextPageUrl, users } = action.payload;
        state.userList = [...state.userList, ...users];
        state.nextPageUrl = nextPageUrl;
        state.isLoading = false;
      })
      .addCase(updateUserList.rejected, (state, action) => {
        if (action.payload === 'refresh-token') {
          state.error = 'Ошибка авторизации';
        } else {
          state.error = action.payload || 'Неизвестная ошибка';
        }
        state.isLoading = false;
      });
  },
});

export const { resetUserListState } = chatListSlice.actions;

export default chatListSlice.reducer;
