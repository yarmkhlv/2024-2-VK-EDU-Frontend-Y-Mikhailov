import { ELEMENTS } from './UI';

export function renderUserInfo(dataUser) {
  const elUserLogo = document.createElement('img');
  const elInfoUser = document.createElement('div');
  const elFio = document.createElement('div');
  const elEntrytime = document.createElement('div');

  elUserLogo.classList.add('info-user-logo');
  elInfoUser.classList.add('info-user');
  elFio.classList.add('info-user__fio');
  elEntrytime.classList.add('info-user__entrytime');

  elUserLogo.src = dataUser.avatarUrl;
  elFio.textContent = dataUser.name;
  elEntrytime.textContent = 'В сети';

  elInfoUser.append(elFio, elEntrytime);

  ELEMENTS.HEADER_MIDDLE_BLOCK.append(elUserLogo, elInfoUser);
}
