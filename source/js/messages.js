import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onMessageClick = () => {
  removeMessage();
};

const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const showMessage = (isSuccess) => {
  let element = errorTemplate.cloneNode(true);

  if (isSuccess) {
    element = successTemplate.cloneNode(true);
  }

  // Перекрываем сообщением карту. При 900 кнопки +/- видны у карты
  element.style.zIndex = 1000;
  main.appendChild(element);

  document.addEventListener('click', onMessageClick, { once: true });

  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
};

const removeMessage = () => {
  main.removeChild(main.lastChild);
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
};

export { showMessage };
