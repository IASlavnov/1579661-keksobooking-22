const ANY_CHOICE_FILTERS = 'any';
const MIDDLE = 'middle';
const LOW = 'low';
const HIGH = 'high';
const LOW_VALUE = 10000;
const HIGH_VALUE = 50000;

// Фильтр по типу жилья
const filterByType = (value, type) => type === ANY_CHOICE_FILTERS || value.offer.type === type;

// Фильтр по цене
const filterByPrice = (value, price) => {
  switch (price) {
    case ANY_CHOICE_FILTERS: return true;
    case MIDDLE: return value.offer.price >= LOW_VALUE && value.offer.price <= HIGH_VALUE;
    case LOW: return value.offer.price < LOW_VALUE;
    case HIGH: return value.offer.price > HIGH_VALUE;
  }
};

// Фильтр по количеству комнат
const filterByRooms = (value, rooms) => rooms === ANY_CHOICE_FILTERS || parseInt(rooms) === value.offer.rooms;

// Фильтр по количеству гостей
const filterByGuests = (value, guests) => guests === ANY_CHOICE_FILTERS || parseInt(guests) === value.offer.guests;

// Фильтр по удобствам
const filterByFeatures = (value, features) => {
  for (let i = 0; i < features.length; i++) {
    if (value.offer.features.indexOf(features[i]) === -1) {
      return false;
    }
  }
  return true;
};

export { filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures };
