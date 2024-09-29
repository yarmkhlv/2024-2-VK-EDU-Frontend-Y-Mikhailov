import { displayMessages } from './displayMessages';
import { getMessagesStore, setMessagesStore } from './messagesStore';

export function getMessagesFromLocalStorage() {
  const messagesFromLocal = JSON.parse(localStorage.getItem('messages')) || [];

  setMessagesStore(messagesFromLocal);

  displayMessages(getMessagesStore());
}
