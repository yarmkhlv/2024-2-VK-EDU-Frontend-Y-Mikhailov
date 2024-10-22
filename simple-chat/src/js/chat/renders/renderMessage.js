import { convertDateToTime } from '../../helpers';
import { ELEMENTS } from '../UI';

export function renderMessage(dataMessage, flagNew = null) {
  const elMessage = document.createElement('div');
  const elTimeOfMessage = document.createElement('span');

  if (dataMessage.owner === 'me') {
    elMessage.classList.add('message', 'own-message');
  } else {
    elMessage.classList.add('message', 'another-persons-message');
  }
  if (flagNew) {
    elMessage.classList.add('newMessage');
  }
  elTimeOfMessage.classList.add('time-message');

  elMessage.textContent = `${dataMessage.text}`;
  elTimeOfMessage.textContent = `${convertDateToTime(dataMessage.date)}`;

  elMessage.appendChild(elTimeOfMessage);

  ELEMENTS.MESSAGES_LIST_EL.appendChild(elMessage);
}
