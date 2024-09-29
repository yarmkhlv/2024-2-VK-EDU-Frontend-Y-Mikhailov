import { sendMessage } from './sendMessage';
import { displayMessages } from './displayMessages';
import { scrollToBottom } from './helpers';
import { getMessagesStore } from './messagesStore';
import { ELEMENTS } from './UI';

ELEMENTS.SUBMIT_MESSAGE_BTN.addEventListener('click', (event) => {
  event.preventDefault();

  const messageText = ELEMENTS.CHAT_INPUT.value;

  sendMessage(messageText);

  displayMessages(getMessagesStore());

  ELEMENTS.CHAT_INPUT.value = '';

  scrollToBottom(ELEMENTS.CHAT_SECTION);
});
