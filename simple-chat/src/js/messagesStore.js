let messagesStore = [];

export function setMessagesStore(newMessages) {
  messagesStore = newMessages;
}

export function getMessagesStore() {
  return messagesStore;
}
