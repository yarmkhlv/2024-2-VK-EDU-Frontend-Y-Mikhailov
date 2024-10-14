import { loremIpsum } from 'lorem-ipsum';

import { renderMessage } from './renders/renderMessage';
import { getQueryParam } from '../helpers';

function generateRandomText() {
  return loremIpsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 5,
    sentenceUpperBound: 10,
  });
}

export function makeAnswerMessage() {
  const newMessage = {
    text: generateRandomText(),
    date: new Date().toISOString(),
    owner: 'anotherUser',
  };

  const usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];

  const userFromParam = Number(getQueryParam('user'));
  const findedId = usersFromLocal.findIndex((user) => user.id == userFromParam);
  usersFromLocal[findedId].messages.push(newMessage);

  localStorage.setItem('users', JSON.stringify(usersFromLocal));

  renderMessage(newMessage, true);
}
