export function convertDateToTime(dateFormatISO) {
  const messageTime = new Date(dateFormatISO);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedTime = messageTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
  });

  return formattedTime;
}

export function convertDateForChatList(dateFormatISO) {
  const messageTime = new Date(dateFormatISO);
  const today = new Date();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const messageDateString = messageTime.toLocaleDateString('ru-RU', {
    timeZone: timeZone,
  });
  const todayDateString = today.toLocaleDateString('ru-RU', {
    timeZone: timeZone,
  });

  if (messageDateString === todayDateString) {
    return messageTime.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timeZone,
    });
  } else {
    return messageTime.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: timeZone,
    });
  }
}

export function scrollToBottom(element) {
  if (!element) return;

  element.scrollTop = element.scrollHeight;
}

export function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function generateRandomId() {
  const randomId = Math.floor(Math.random() * 10000) + 1;
  return randomId;
}
