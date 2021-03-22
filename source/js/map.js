/* global L:readonly */
/* global _:readonly */
import { initForm } from './form.js';
import { renderCard } from './render-card.js';
import { getData } from './api.js';
import { getFilterObject, getFilteredData } from './filters.js';
import { uploadPreviews } from './upload-files.js';

const TOKYO_LATITUDE = 35.68950;
const TOKYO_LONGITUDE = 139.69171;
const PRECISION = 5;
const ZOOM_MAP = 10;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
// Количество объявлений
const ADS_COUNT = 10;

// Задержка для _.debounce()
const RERENDER_DELAY = 500;

// Карта
const map = L.map('map-canvas');
// Массив пинов для объявлений
const markers = [];

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
    .filter((value) => getFilteredData(value, filter));

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

const onFiltersChanged = _.debounce(renderMarkers, RERENDER_DELAY);

// Действия при загрузке карты
const onMapLoad = () => {
  toggleFormState(true);
  initForm();
  uploadPreviews();
  getData()
    .then((ads) => {
      const filterObject = getFilterObject();
      renderMarkers(ads, filterObject);
      mapFilters.addEventListener('change', (evt) => {
        const filterObject = getFilterObject(evt);
        onFiltersChanged(ads, filterObject);
      });
    })
    .then(() => toggleMapFiltersState(true));
};

// Инициализация карты
const initMap = () => {
  toggleMapFiltersState(false);
  toggleFormState(false);
  map.on('load', onMapLoad)
    .setView({
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    }, ZOOM_MAP);

  setTileLayer();

  renderMainMarker();
};

export { initMap, setMainMarkerDefault, renderMarkers };
