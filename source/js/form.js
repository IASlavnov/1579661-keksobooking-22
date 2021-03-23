import { getData, sendData } from './api.js';
import { setMainMarkerDefault } from './map.js';
import { showMessage } from './messages.js';
import { renderMarkers } from './map.js';
import { getFilterObject } from './filters.js';
import { resetPreviews } from './upload-files.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const RoomNumber = {
  ONE_ROOM: 1,
  TWO_ROOMS: 2,
  THREE_ROOMS: 3,
  ONE_HUNDRED_ROOMS: 100,
};
const RoomCapacity = {
  NOT_FOR_GUESTS: 0,
  ONE_GUEST: 1,
  TWO_GUESTS: 2,
};

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

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

const validateRoomCapacity = () => {
  if (parseInt(formRoomNumber.value) === RoomNumber.ONE_ROOM && parseInt(formCapacity.value) !== RoomCapacity.ONE_GUEST) {
    formCapacity.setCustomValidity('Для 1 комнаты подходит только вариант - 1 гость');
  } else if (parseInt(formRoomNumber.value) === RoomNumber.TWO_ROOMS
    && parseInt(formCapacity.value) !== RoomCapacity.ONE_GUEST
    && parseInt(formCapacity.value) !== RoomCapacity.TWO_GUESTS) {
    formCapacity.setCustomValidity('Для 2 комнат подходят варианты - 1 или 2 гостя');
  } else if (parseInt(formRoomNumber.value) === RoomNumber.THREE_ROOMS
    && parseInt(formCapacity.value) === RoomCapacity.NOT_FOR_GUESTS) {
    formCapacity.setCustomValidity('Для 3 комнат подходят варианты - 1, 2 или 3 гостя');
  } else if (parseInt(formRoomNumber.value) === RoomNumber.ONE_HUNDRED_ROOMS
    && parseInt(formCapacity.value) !== RoomCapacity.NOT_FOR_GUESTS) {
    formCapacity.setCustomValidity('Для 100 комнат подходит вариант - не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }

  formCapacity.reportValidity();
};

// Валидация формы
const validateForm = () => {
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
    validateRoomCapacity();
  });

  formCapacity.addEventListener('change', () => {
    validateRoomCapacity();
  });
};

// Сброс формы
const onFormReset = () => {
  form.reset();
  resetPreviews();
  mapFilters.reset();
  getData().then((ads) => {
    const filterObject = getFilterObject();
    renderMarkers(ads, filterObject);
  });
  setMainMarkerDefault();
};

// Действия при успешной отправке
const onSuccessSubmit = () => {
  showMessage(true);
  onFormReset();
};

// Действия при ошибке отправки
const onErrorSubmit = () => {
  showMessage(false);
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

  validateForm();

  setFormSubmit(onSuccessSubmit, onErrorSubmit);

  formReset.addEventListener('click', onFormReset);
};

export { initForm };
