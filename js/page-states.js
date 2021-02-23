const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

// Включение неактивного состояния страницы
const enableInactiveState = () => {
  for (let element of mapFilters.children) {
    element.disabled = true;
  }

  for (let element of adForm.children) {
    element.disabled = true;
  }

  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
};

// Включение активного состояния страницы
const enableActiveState = () => {
  for (let element of mapFilters.children) {
    element.disabled = false;
  }

  for (let element of adForm.children) {
    element.disabled = false;
  }

  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
};

export { enableInactiveState, enableActiveState };
