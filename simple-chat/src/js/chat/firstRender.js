import { renderMessage } from './renderMessage';
import { renderUserInfo } from './renderUserInfo';
import { getQueryParam } from '../helpers';

export function firstRender() {
  const userFromParam = Number(getQueryParam('user'));

  const usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];
  if (usersFromLocal.length > 0) {
    const findedUser = usersFromLocal.find((user) => user.id === userFromParam);

    renderUserInfo(findedUser);
    findedUser.messages.forEach((item) => renderMessage(item));
  }
}

firstRender();
