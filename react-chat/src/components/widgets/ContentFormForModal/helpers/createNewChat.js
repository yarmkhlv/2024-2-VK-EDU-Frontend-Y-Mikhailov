import { generateRandomId } from '../../../../utils/generateRandomId';

export function createNewChat(userName) {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
  const userId = generateRandomId(usersFromLocalStorage);

  const newUser = {
    id: userId,
    name: userName,
    avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${userName + userId}`,
    messages: [],
  };

  usersFromLocalStorage.push(newUser);

  localStorage.setItem('users', JSON.stringify(usersFromLocalStorage));
}
