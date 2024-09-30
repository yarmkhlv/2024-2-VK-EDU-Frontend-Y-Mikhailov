import { loremIpsum } from 'lorem-ipsum';

import { createMessage } from './createMessage';

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

  const messagesWIthNew = JSON.parse(localStorage.getItem('messages')) || [];

  messagesWIthNew.push(newMessage);

  localStorage.setItem('messages', JSON.stringify(messagesWIthNew));

  createMessage(newMessage);
}
