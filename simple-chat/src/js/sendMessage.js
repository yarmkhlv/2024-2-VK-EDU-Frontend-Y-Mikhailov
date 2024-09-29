import { getMessagesStore } from './messagesStore';

export function sendMessage(message) {
  if (message.trim() === '') return;

  const newMessage = {
    text: message,
    date: new Date().toISOString(),
    owner: 'Yaroslave',
  };

  getMessagesStore().push(newMessage);

  localStorage.setItem('messages', JSON.stringify(getMessagesStore()));
}
