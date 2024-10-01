import { createMessage } from './createMessage';

export function sendMessage(message) {
  if (message.trim() === '') return;

  const newMessage = {
    text: message,
    date: new Date().toISOString(),
    owner: 'me',
  };

  const messagesWIthNew = JSON.parse(localStorage.getItem('messages')) || [];

  messagesWIthNew.push(newMessage);

  localStorage.setItem('messages', JSON.stringify(messagesWIthNew));

  createMessage(newMessage);
}
