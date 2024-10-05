import { getQueryParam } from '../helpers';
import { renderMessage } from './renderMessage';

export function sendMessage(message) {
  if (message.trim() === '') return;

  const newMessage = {
    text: message,
    date: new Date().toISOString(),
    owner: 'me',
  };

  const usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];

  const userFromParam = Number(getQueryParam('user'));
  const findedId = usersFromLocal.findIndex((user) => user.id == userFromParam);
  usersFromLocal[findedId].messages.push(newMessage);

  localStorage.setItem('users', JSON.stringify(usersFromLocal));

  renderMessage(newMessage);
}
