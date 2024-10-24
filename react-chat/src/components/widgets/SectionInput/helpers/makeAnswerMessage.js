import { loremIpsum } from 'lorem-ipsum';

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

  return newMessage;
}
