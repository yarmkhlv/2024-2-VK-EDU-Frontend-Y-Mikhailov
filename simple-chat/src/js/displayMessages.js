import { createMessage } from './createMessage';

export function displayMessages(messages) {
  messages.forEach((item) => createMessage(item));
}
