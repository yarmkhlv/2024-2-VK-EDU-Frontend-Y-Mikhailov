import { convertDateToTime } from "./helpers";
import { ELEMENTS } from "./UI";

export function displayMessages(messages) {
  ELEMENTS.MESSAGES_LIST_EL.innerHTML = "";
  messages.forEach((item) => createMessage(item));
}

function createMessage(dataMessage) {
  const elMessage = document.createElement("div");
  const elTimeOfMessage = document.createElement("span");

  elMessage.classList.add("message", "own-message");
  elTimeOfMessage.classList.add("time-message");

  elMessage.textContent = `${dataMessage.text}`;
  elTimeOfMessage.textContent = `${convertDateToTime(dataMessage.date)}`;

  elMessage.appendChild(elTimeOfMessage);

  ELEMENTS.MESSAGES_LIST_EL.appendChild(elMessage);
}
