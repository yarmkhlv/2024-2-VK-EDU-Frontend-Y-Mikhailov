export function showNotification(message) {
  if (!('Notification' in window)) {
    console.error('Уведомления не поддерживаются вашим браузером.');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(message.sender.username, {
      body: message.text,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(message.sender.username, {
          body: message.text,
        });
      }
    });
  }
}
