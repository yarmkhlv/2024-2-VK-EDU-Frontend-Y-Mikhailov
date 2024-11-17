export function convertDate(dateFormatISO) {
  if (!dateFormatISO) return;
  const normalizedDateFormat = dateFormatISO.replace(/\.\d{6}/, '');

  const messageTime = new Date(Date.parse(normalizedDateFormat));
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
