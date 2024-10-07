import { renderMessage } from './renderMessage';
import { getQueryParam } from '../../helpers';

export function renderListMessage() {
  const userFromParam = Number(getQueryParam('user'));

  const usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];
  if (usersFromLocal.length > 0) {
    const findedUser = usersFromLocal.find((user) => user.id === userFromParam);

    findedUser.messages.forEach((item) => renderMessage(item));
  }
}

renderListMessage();
