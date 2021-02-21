import { TYPE_MIN_PRICE } from './data.js';

const form = document.querySelector('.ad-form');

// Время заезда и выезда
const formTime = form.querySelector('.ad-form__element--time');
const timeIn = formTime.querySelector('#timein');
const timeOut = formTime.querySelector('#timeout');

// Тип жилья
const formType = form.querySelector('#type');
// Цена за ночь, руб.
const formPrice = form.querySelector('#price');

formTime.addEventListener('change', (evt) => {
  evt.target === timeIn ? timeOut.selectedIndex = timeIn.selectedIndex : timeIn.selectedIndex = timeOut.selectedIndex;
});

formType.addEventListener('change', () => {
  formPrice.placeholder = TYPE_MIN_PRICE[formType.value];
  formPrice.min = TYPE_MIN_PRICE[formType.value];
});
