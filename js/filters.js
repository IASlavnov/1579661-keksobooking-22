const ANY_CHOICE_FILTERS = 'any';

// Фильтр по типу жилья
const filterByType = (value, type) => type === ANY_CHOICE_FILTERS || value.offer.type === type;

// Фильтр по цене
const filterByPrice = (value, price) => {
  switch (price) {
    case 'any': return true;
    case 'middle': return value.offer.price >= 10000 && value.offer.price <= 50000;
    case 'low': return value.offer.price < 10000;
    case 'high': return value.offer.price > 50000;
  }
};

// Фильтр по количеству комнат
const filterByRooms = (value, rooms) => rooms === ANY_CHOICE_FILTERS || parseInt(rooms) === value.offer.rooms;

// Фильтр по количеству гостей
const filterByGuests = (value, guests) => guests === ANY_CHOICE_FILTERS || parseInt(guests) === value.offer.guests;

// Фильтр по удобствам
const filterByFeatures = (value, features) => {
  if (features.length) {
    for (let i = 0; i < features.length; i++) {
      if (value.offer.features.indexOf(features[i]) === -1) {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
};

export { filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures };
