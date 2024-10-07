import { createMessage } from './renders/renderMessage';

export function displayMessages(messages) {
  messages.forEach((item) => createMessage(item));
}
