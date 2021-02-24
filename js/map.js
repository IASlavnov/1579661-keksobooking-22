/* global L:readonly */
import { initForm } from './form.js';
import { renderCard } from './render-cards.js';
import { getAds } from './data.js';

const TOKYO_LATITUDE = 35.68950;
const TOKYO_LONGITUDE = 139.69171;
const PRECISION = 5;
const ZOOM_MAP = 10;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

// Тестовые данные
const points = getAds();
// Поле ввода адреса и формы
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputAddress = adForm.querySelector('#address');

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

const setTileLayer = (map) => {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Создание главного пина
const renderMainMarker = (map) => {
  // Создали иконку для пина
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
    iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
  });

  // Создали пин
  const mainMarker = L.marker(
    {
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    inputAddress.value = `${lat.toFixed(PRECISION)}, ${lng.toFixed(PRECISION)}`;
  });
};

// Создание обычных пинов
const renderMarkers = (map, array) => {
  array.forEach((value) => {
    // Создали иконку для пина
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_WIDTH, PIN_HEIGHT],
      iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
    });

    // Создали пины
    const marker = L.marker(
      {
        lat: value.location.x,
        lng: value.location.y,
      },
      {
        icon: pinIcon,
      });

    // Добавили пины с балунами
    marker.addTo(map).bindPopup(renderCard(value),
      {
        keepInView: true,
      },
    );
  });
};

// Инициализация карты
const initMap = () => {
  togglePageState(false);
  const map = L.map('map-canvas').on('load', () => {
    togglePageState(true);
    initForm();
  })
    .setView({
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    }, ZOOM_MAP);

  setTileLayer(map);

  renderMainMarker(map);

  renderMarkers(map, points);
};

export { initMap };
