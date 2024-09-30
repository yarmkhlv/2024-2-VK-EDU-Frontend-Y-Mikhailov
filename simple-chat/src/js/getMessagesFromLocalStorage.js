import { displayMessages } from './displayMessages';

export function getMessagesFromLocalStorage() {
  const messagesFromLocal = JSON.parse(localStorage.getItem('messages')) || [];

  displayMessages(messagesFromLocal);
}
