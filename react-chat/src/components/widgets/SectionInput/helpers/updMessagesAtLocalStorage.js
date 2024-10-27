export const updMessagesAtLocalStorage = (userId, newMessage) => {
  const usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];
  const findedId = usersFromLocal.findIndex((user) => user.id == userId);
  usersFromLocal[findedId].messages.push(newMessage);
  localStorage.setItem('users', JSON.stringify(usersFromLocal));
};
