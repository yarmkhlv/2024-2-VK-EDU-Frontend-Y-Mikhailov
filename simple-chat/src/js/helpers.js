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

export function scrollToBottom(element) {
  if (!element) return;
  console.log(element);
  console.log(element.scrollTop, element.scrollHeight);
  element.scrollTop = element.scrollHeight;
}
