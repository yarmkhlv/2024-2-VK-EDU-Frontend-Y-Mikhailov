import { renderChat } from './renderChat';

export function renderListChat() {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];

  usersFromLocalStorage.forEach(renderChat);
}

renderListChat();
