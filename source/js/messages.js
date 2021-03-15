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

  return element;
};

const removeMessage = (element) => {
  main.removeChild(element);
}

export { showMessage, removeMessage };
