export function scrollToBottom(element) {
  setTimeout(() => {
    const findedEl = document.getElementById(element);
    if (!findedEl) return;
    findedEl.scrollTop = findedEl.scrollHeight;
  }, 0);
}
