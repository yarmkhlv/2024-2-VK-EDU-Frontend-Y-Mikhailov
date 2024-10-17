import { ELEMENTS } from './UI';
import { createNewChat } from './createNewChat';

ELEMENTS.CREATE_NEW_CHAT_BTN.addEventListener('click', (event) => {
  event.preventDefault();

  const userName = prompt('Введите имя собеседника:');

  if (!userName.trim()) return;

  createNewChat(userName);
});
