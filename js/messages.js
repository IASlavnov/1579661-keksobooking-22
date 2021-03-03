const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (isSuccess) => {
  let element = errorTemplate.cloneNode(true);

  if (isSuccess) {
    element = successTemplate.cloneNode(true);
  }

  main.appendChild(element);

  return element;
};

const removeMessage = (element) => {
  main.removeChild(element);
}

export { showMessage, removeMessage };
