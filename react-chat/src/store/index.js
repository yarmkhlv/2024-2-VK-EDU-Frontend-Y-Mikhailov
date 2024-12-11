import { configureStore, combineReducers } from '@reduxjs/toolkit';
import currentUserSlice from './currentUser/slice';
import authSlice from './auth/slice';
import chatListSlice from './chatList/slice';
import currentChatSlice from './currentChat/slice';
import userListSlice from './userList/slice';
import messagesSlice from './messages/slice';

const rootReducer = combineReducers({
  auth: authSlice,
  chatList: chatListSlice,
  currentUser: currentUserSlice,
  currentChat: currentChatSlice,
  userList: userListSlice,
  messages: messagesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
