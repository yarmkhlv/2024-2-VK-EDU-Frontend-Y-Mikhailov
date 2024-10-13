import { generateRandomId } from '../helpers';
import { renderChat } from './renders/renderChat';

export function createNewChat(userName) {
  const userId = generateRandomId();

  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
  const newUser = {
    id: userId,
    name: userName,
    avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${userName + userId}`,
    messages: [],
  };

  usersFromLocalStorage.push(newUser);

  localStorage.setItem('users', JSON.stringify(usersFromLocalStorage));

  renderChat(newUser);
}