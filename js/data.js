import { getRandomInt, getCoordinate, getRandomArrayElement, getRandomArray } from './util.js';

const MAX_ROOMS = 5;
const MAX_GUESTS = 10;
const MAX_PRICE = 1000000;
const ADS_COUNT = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TYPE_DICTIONARY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};
const TYPE_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LocationCoordinates = {
  X_MIN: 35.65,
  X_MAX: 35.7,
  Y_MIN: 139.7,
  Y_MAX: 139.8,
  precision: 5,
};

const createAd = () => {
  const location = getCoordinate(LocationCoordinates);
  return {
    author: { avatar: `img/avatars/user0${getRandomInt(1, 8)}.png` },
    offer: {
      title: 'Title',
      address: `${location.x}, ${location.y}`,
      price: getRandomInt(1000, MAX_PRICE),
      type: TYPE_DICTIONARY[getRandomArrayElement(TYPES)],
      rooms: getRandomInt(1, MAX_ROOMS),
      guests: getRandomInt(1, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArray(FEATURES),
      description: 'Some description',
      photos: getRandomArray(PHOTOS),
    },
    location,
  };
};

const getAds = () => new Array(ADS_COUNT).fill(null).map(() => createAd());

export { getAds, TYPE_MIN_PRICE };
