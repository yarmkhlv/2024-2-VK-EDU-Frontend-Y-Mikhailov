import { convertDateForChatList } from '../../helpers';
import { ELEMENTS } from '../UI';

export function renderChat(dataUser) {
  const elLinkWrapperChat = document.createElement('a');
  const elUserChat = document.createElement('div');

  const elAvaratImg = document.createElement('img');
  const elInfo = document.createElement('div');

  const elInfoUpper = document.createElement('div');
  const elInfoBottom = document.createElement('div');

  const elInfoUpperTitle = document.createElement('div');
  const elInfoUpperLastMessage = document.createElement('div');

  elUserChat.classList.add('user-chat');
  elAvaratImg.classList.add('user-chat__img');
  elInfo.classList.add('user-chat__info');
  elInfoUpper.classList.add('user-chat__info_upper');
  elInfoBottom.classList.add('user-chat__info_bottom');
  elInfoUpperTitle.classList.add('user-chat__info_upper_title');
  elInfoUpperLastMessage.classList.add(
    'user-chat__info_upper_last-message-status'
  );
  elLinkWrapperChat.classList.add('link-wrapper-chat');

  elLinkWrapperChat.href = `chat.html?user=${dataUser.id}`;

  elInfoUpperTitle.textContent = `${dataUser.name}`;
  if (dataUser.messages.length > 0) {
    const lastMessage = dataUser.messages[dataUser.messages.length - 1];
    elInfoBottom.textContent = `${lastMessage.text}`;
    elInfoUpperLastMessage.textContent = `${convertDateForChatList(lastMessage.date)}`;
  } else {
    elInfoBottom.textContent = `Пока сообщений в чате нет`;
  }

  elAvaratImg.src = dataUser.avatarUrl;
  elAvaratImg.alt = `${dataUser.name} аватар`;

  elUserChat.append(elAvaratImg, elInfo);
  elInfo.append(elInfoUpper, elInfoBottom);
  elInfoUpper.append(elInfoUpperTitle, elInfoUpperLastMessage);

  elLinkWrapperChat.appendChild(elUserChat);

  ELEMENTS.CHAT_LIST.appendChild(elLinkWrapperChat);
}
