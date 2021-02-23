/* global L:readonly */
import { enableActiveState } from './page-states.js';
import { initForm } from './form.js';
import { renderCards } from './render-cards.js';
import { getAds } from './data.js';

const TOKYO_LATITUDE = 35.68950;
const TOKYO_LONGITUDE = 139.69171;
const PRECISION = 5;
const ZOOM_MAP = 10;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

// Поле ввода адреса
const inputAddress = document.querySelector('#address');

// Создание главного пина
const renderMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
    iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
  });

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

  return mainMarker;
};

// Создание обычных пинов
const renderMarkers = (map) => {
  const points = getAds();
  points.forEach(({ location }) => {
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_WIDTH, PIN_HEIGHT],
      iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
    });
    const marker = L.marker(
      {
        lat: location.x,
        lng: location.y,
      },
      {
        icon: pinIcon,
      });
    marker.addTo(map).bindPopup(renderCards(points),
      {
        keepInView: true,
      },
    );
  });
};

// Инициализация карты
const initMap = () => {
  const map = L.map('map-canvas').on('load', () => {
    enableActiveState();
    initForm();
    inputAddress.value = `${TOKYO_LATITUDE.toFixed(PRECISION)}, ${TOKYO_LONGITUDE.toFixed(PRECISION)}`;
    inputAddress.readOnly = true;
  })
    .setView({
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    }, ZOOM_MAP);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarker = renderMainMarker();
  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    inputAddress.value = `${lat.toFixed(PRECISION)}, ${lng.toFixed(PRECISION)}`;
  });

  renderMarkers(map);
};

export { initMap };
