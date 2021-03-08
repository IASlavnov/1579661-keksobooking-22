/* global L:readonly */
/* global _:readonly */
import { initForm } from './form.js';
import { renderCard } from './render-card.js';
import { getData } from './api.js';
import { filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures } from './filters.js';

const TOKYO_LATITUDE = 35.68950;
const TOKYO_LONGITUDE = 139.69171;
const PRECISION = 5;
const ZOOM_MAP = 10;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const ANY_CHOICE_FILTERS = 'any';
// Количество объявлений
const ADS_COUNT = 10;
const RERENDER_DELAY = 500;

// Карта
const map = L.map('map-canvas');
// Массив пинов для объявлений
const markers = [];
// Объект для фильтра
const filterObject = {
  housingType: ANY_CHOICE_FILTERS,
  housingPrice: ANY_CHOICE_FILTERS,
  housingRooms: ANY_CHOICE_FILTERS,
  housingGuests: ANY_CHOICE_FILTERS,
  housingFeatures: [],
};

// Поле ввода адреса и формы
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputAddress = adForm.querySelector('#address');

// Переключение состояния фильтров
const toggleMapFiltersState = (isMapInit) => {
  for (let element of mapFilters.children) {
    element.disabled = !isMapInit;
  }

  isMapInit ? mapFilters.classList.remove('map__filters--disabled') : mapFilters.classList.add('map__filters--disabled');
};

// Переключение состояния формы
const toggleFormState = (isMapInit) => {
  for (let element of adForm.children) {
    element.disabled = !isMapInit;
  }

  isMapInit ? adForm.classList.remove('ad-form--disabled') : adForm.classList.add('ad-form--disabled');
};

// Добавили слой карты
const setTileLayer = () => {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};


// Создание главного пина
const mainMarker = L.marker(
  {
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  },
  {
    draggable: true,
  },
);

// Возвращаем начальное положение метки
const setMainMarkerDefault = () => {
  mainMarker.setLatLng(L.latLng(TOKYO_LATITUDE, TOKYO_LONGITUDE));
};

// Создание главного пина
const renderMainMarker = () => {
  // Создали иконку для пина
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
    iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
  });

  mainMarker.setIcon(mainPinIcon);
  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    inputAddress.value = `${lat.toFixed(PRECISION)}, ${lng.toFixed(PRECISION)}`;
  });
};

// Удаление всех маркеров с карты
const removeAllMarkers = (markers) => {
  markers.forEach(value => value.remove())
};

// Создание обычных пинов
const renderMarkers = (ads, filter) => {
  // Копируем, чтобы не повредить исходные данные с сервера, фильтруем по типу
  const filteredAds = ads
    .slice()
    .filter((value) => filterByType(value, filter.housingType))
    .filter((value) => filterByPrice(value, filter.housingPrice))
    .filter((value) => filterByRooms(value, filter.housingRooms))
    .filter((value) => filterByGuests(value, filter.housingGuests))
    .filter((value) => filterByFeatures(value, filterObject.housingFeatures));

  if (markers.length) {
    removeAllMarkers(markers);
  }

  // Работаем с отфильтрованным массивом
  filteredAds
    // Не больше 10 объявлений
    .slice(0, ADS_COUNT)
    .forEach((value) => {
      // Создали иконку для пина
      const pinIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [PIN_WIDTH, PIN_HEIGHT],
        iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
      });

      // Создали пины
      const marker = L.marker(
        {
          lat: value.location.lat,
          lng: value.location.lng,
        },
        {
          icon: pinIcon,
        });

      marker.bindPopup(renderCard(value),
        {
          keepInView: true,
        },
      );

      // Добавили в массив и на карту
      markers.push(marker);
      marker.addTo(map);
    });
};

// Собираем объект с данными о выбранных фильтрах
const setFilterObject = (evt) => {
  if (evt.target.parentElement.id === 'housing-features') {
    if (filterObject.housingFeatures.includes(evt.target.value)) {
      let index = filterObject.housingFeatures.findIndex(value => value === evt.target.value);
      filterObject.housingFeatures.splice(index, 1);
    } else {
      filterObject.housingFeatures.push(evt.target.value);
    }
  }
  switch (evt.target.id) {
    case 'housing-type':
      filterObject.housingType = evt.target.value;
      break;
    case 'housing-price':
      filterObject.housingPrice = evt.target.value;
      break;
    case 'housing-rooms':
      filterObject.housingRooms = evt.target.value;
      break;
    case 'housing-guests':
      filterObject.housingGuests = evt.target.value;
      break;
  }
};

// Инициализация карты
const initMap = () => {
  toggleMapFiltersState(false);
  toggleFormState(false);
  map.on('load', () => {
    toggleFormState(true);
    initForm();
    getData()
      .then((ads) => {
        renderMarkers(ads, filterObject);
        mapFilters.addEventListener('change', (evt) => {
          setFilterObject(evt);
          // renderMarkers(ads, filterObject);
          // Что-то здесь явно не работает!
          _.debounce(renderMarkers(ads, filterObject), RERENDER_DELAY);
        });
      })
      .then(() => toggleMapFiltersState(true));
  })
    .setView({
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    }, ZOOM_MAP);

  setTileLayer();

  renderMainMarker();
};

export { initMap, setMainMarkerDefault };
