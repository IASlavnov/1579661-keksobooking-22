const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAX_ROOMS = 5;
const MAX_GUESTS = 10;
const LocationCoordinates = {
  X_MIN: 35.65,
  X_MAX: 35.7,
  Y_MIN: 139.7,
  Y_MAX: 139.8,
  precision: 5,
};
const ADS_COUNT = 10;

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон значений должен быть больше или равен 0');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max, decimal) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон значений должен быть больше или равен 0');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};

const getCoordinate = (Coordinates) => {
  return {
    x: getRandomFloat(Coordinates.X_MIN, Coordinates.X_MAX, Coordinates.precision),
    y: getRandomFloat(Coordinates.Y_MIN, Coordinates.Y_MAX, Coordinates.precision),
  };
};

const getRandomArrayElement = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Передаваемые данные должны быть массивом');
  }

  return array[getRandomInt(0, array.length - 1)];
};

const getRandomArray = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Передаваемые данные должны быть массивом')
  }

  return array.filter(() => Math.random() > 0.5);
};

const createAd = () => {
  const location = getCoordinate(LocationCoordinates);
  return {
    author: { avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png' },
    offer: {
      title: 'Title',
      address: location.x + ', ' + location.y,
      price: getRandomInt(1000, Number.MAX_SAFE_INTEGER),
      type: getRandomArrayElement(TYPES),
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

const ads = new Array(ADS_COUNT).fill(null).map(() => createAd());

ads;
