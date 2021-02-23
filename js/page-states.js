const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

// Переключение состояния страницы в зависимости от инициализации карты
const togglePageState = (isMapInit) => {
  for (let element of mapFilters.children) {
    element.disabled = !isMapInit;
  }

  for (let element of adForm.children) {
    element.disabled = !isMapInit;
  }

  if (isMapInit) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }
};

export { togglePageState };
