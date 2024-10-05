import { sendMessage } from './sendMessage';
import { makeAnswerMessage } from './makeAnswerMessage';
import { scrollToBottom } from '../helpers';
import { ELEMENTS } from './UI';

ELEMENTS.SUBMIT_MESSAGE_BTN.addEventListener('click', (event) => {
  event.preventDefault();

  const messageText = ELEMENTS.CHAT_INPUT.value;

  sendMessage(messageText);

  ELEMENTS.CHAT_INPUT.value = '';

  scrollToBottom(ELEMENTS.CHAT_SECTION);

  setTimeout(() => {
    makeAnswerMessage();
  }, 2500);
});
