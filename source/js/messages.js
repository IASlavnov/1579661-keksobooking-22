import { onMessageClick, onMessageEscKeydown } from './form.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (isSuccess) => {
  let element = errorTemplate.cloneNode(true);

  if (isSuccess) {
    element = successTemplate.cloneNode(true);
  }

  // Перекрываем сообщением карту. При 900 кнопки +/- видны у карты
  element.style.zIndex = 1000;
  main.appendChild(element);
};

const removeMessage = () => {
  main.removeChild(main.lastChild);
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
};

export { showMessage, removeMessage };
