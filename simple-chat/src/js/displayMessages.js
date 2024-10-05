import { createMessage } from './chat/renderMessage';

export function displayMessages(messages) {
  messages.forEach((item) => createMessage(item));
}
