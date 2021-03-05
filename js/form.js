import { sendData } from './api.js';
import { setMainMarkerDefault } from './map.js';
import { showMessage, removeMessage } from './messages.js';
import { isEscEvent } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};

const form = document.querySelector('.ad-form');

// Время заезда и выезда
const formTime = form.querySelector('.ad-form__element--time');
const timeIn = formTime.querySelector('#timein');
const timeOut = formTime.querySelector('#timeout');

// Тип жилья
const formType = form.querySelector('#type');
// Цена за ночь, руб.
const formPrice = form.querySelector('#price');
// Заголовок объявления
const formTitle = form.querySelector('#title');
// Количество комнат
const formRoomNumber = form.querySelector('#room_number');
// Количество мест
const formCapacity = form.querySelector('#capacity');
// Кнопка сброса
const formReset = form.querySelector('.ad-form__reset');

const validationRoomCapacity = () => {
  if (parseInt(formRoomNumber.value) === 1 && parseInt(formCapacity.value) !== 1) {
    formCapacity.setCustomValidity('Для 1 комнаты подходит только вариант - 1 гость');
  } else if (parseInt(formRoomNumber.value) === 2 && parseInt(formCapacity.value) !== 1 && parseInt(formCapacity.value) !== 2) {
    formCapacity.setCustomValidity('Для 2 комнат подходят варианты - 1 или 2 гостя');
  } else if (parseInt(formRoomNumber.value) === 3 && parseInt(formCapacity.value) === 0) {
    formCapacity.setCustomValidity('Для 3 комнат подходят варианты - 1, 2 или 3 гостя');
  } else if (parseInt(formRoomNumber.value) === 100 && parseInt(formCapacity.value) !== 0) {
    formCapacity.setCustomValidity('Для 100 комнат подходит вариант - не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }

  formCapacity.reportValidity();
};

// Валидация формы
const validationForm = () => {
  formPrice.addEventListener('input', () => {
    if (formPrice.value < parseInt(formPrice.min)) {
      formPrice.setCustomValidity(`Введите значение больше чем ${formPrice.min}`)
    } else if (formPrice.value > parseInt(formPrice.max)) {
      formPrice.setCustomValidity(`Введеное значение должно быть меньше чем ${formPrice.max}`)
    } else {
      formPrice.setCustomValidity('');
    }

    formPrice.reportValidity();
  });

  formTitle.addEventListener('input', () => {
    const valueLength = formTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      formTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`)
    } else if (valueLength > MAX_TITLE_LENGTH) {
      formTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`)
    } else {
      formTitle.setCustomValidity('');
    }

    formTitle.reportValidity();
  });

  formRoomNumber.addEventListener('change', () => {
    validationRoomCapacity();
  });

  formCapacity.addEventListener('change', () => {
    validationRoomCapacity();
  });
};

// Сброс формы
const resetForm = () => {
  form.reset();
  setMainMarkerDefault();
};

// Действия при успешной отправке
const successSubmit = () => {
  resetForm();
  const message = showMessage(true);

  document.addEventListener('click', () => {
    removeMessage(message);
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessage(message);
    }
  }, { once: true });
};

// Действия при ошибке отправки
const errorSubmit = () => {
  const message = showMessage(false);

  document.addEventListener('click', () => {
    removeMessage(message);
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessage(message);
    }
  }, { once: true });
};

// Отправка формы
const setFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(formData)
      .then(() => onSuccess())
      .catch(() => onFail());
  });
};

// Инициализация формы
const initForm = () => {
  formTime.addEventListener('change', (evt) => {
    evt.target === timeIn ? timeOut.selectedIndex = timeIn.selectedIndex : timeIn.selectedIndex = timeOut.selectedIndex;
  });

  formType.addEventListener('change', () => {
    formPrice.placeholder = TYPE_MIN_PRICE[formType.value];
    formPrice.min = TYPE_MIN_PRICE[formType.value];
    // Сами генерируем событие input при переключении типа жилья
    // Пример: Типа жилья: Квартира, Цена: 10 -> ошибка
    // Переключили на Бунгало, Цена: 10 -> по-прежнему ошибка без этой генерации
    const eventInput = new Event('input');
    formPrice.dispatchEvent(eventInput);
  });

  validationForm();

  setFormSubmit(successSubmit, errorSubmit);

  formReset.addEventListener('click', resetForm);
};

export { initForm };
