const FilterValues = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const PriceValues = {
  LOW_VALUE: 10000,
  HIGH_VALUE: 50000,
};

// Перечисление для сбора объекта по выбранным фильтрам
const FilterTypes = {
  HOUSING_TYPE: 'housing-type',
  HOUSING_PRICE: 'housing-price',
  HOUSING_ROOMS: 'housing-rooms',
  HOUSING_GUESTS: 'housing-guests',
  HOUSING_FEATURES: 'housing-features',
};

// Объект для фильтра
const filterObject = {
  housingType: FilterValues.ANY,
  housingPrice: FilterValues.ANY,
  housingRooms: FilterValues.ANY,
  housingGuests: FilterValues.ANY,
  housingFeatures: [],
};

//
const getInitialFilterObject = () => {
  filterObject.housingType = FilterValues.ANY;
  filterObject.housingPrice = FilterValues.ANY;
  filterObject.housingRooms = FilterValues.ANY;
  filterObject.housingGuests = FilterValues.ANY;
  filterObject.housingFeatures = [];

  return filterObject;
};

// Собираем объект с данными о выбранных фильтрах
const getFilterObject = (evt = FilterValues.ANY) => {
  if (evt === FilterValues.ANY) {
    return getInitialFilterObject();
  } else {
    if (evt.target.parentElement.id === FilterTypes.HOUSING_FEATURES) {
      if (filterObject.housingFeatures.includes(evt.target.value)) {
        let index = filterObject.housingFeatures.findIndex(value => value === evt.target.value);
        filterObject.housingFeatures.splice(index, 1);
      } else {
        filterObject.housingFeatures.push(evt.target.value);
      }
    }
    switch (evt.target.id) {
      case FilterTypes.HOUSING_TYPE:
        filterObject.housingType = evt.target.value;
        break;
      case FilterTypes.HOUSING_PRICE:
        filterObject.housingPrice = evt.target.value;
        break;
      case FilterTypes.HOUSING_ROOMS:
        filterObject.housingRooms = evt.target.value;
        break;
      case FilterTypes.HOUSING_GUESTS:
        filterObject.housingGuests = evt.target.value;
        break;
    }
    return filterObject;
  }
};

// Фильтр по типу жилья
const filterByType = (value, type) => type === FilterValues.ANY || value.offer.type === type;

// Фильтр по цене
const filterByPrice = (value, price) => {
  switch (price) {
    case FilterValues.ANY: return true;
    case FilterValues.MIDDLE: return value.offer.price >= PriceValues.LOW_VALUE && value.offer.price <= PriceValues.HIGH_VALUE;
    case FilterValues.LOW: return value.offer.price < PriceValues.LOW_VALUE;
    case FilterValues.HIGH: return value.offer.price > PriceValues.HIGH_VALUEE;
  }
};

// Фильтр по количеству комнат
const filterByRooms = (value, rooms) => rooms === FilterValues.ANY || parseInt(rooms) === value.offer.rooms;

// Фильтр по количеству гостей
const filterByGuests = (value, guests) => guests === FilterValues.ANY || parseInt(guests) === value.offer.guests;

// Фильтр по удобствам
const filterByFeatures = (value, features) => {
  for (let i = 0; i < features.length; i++) {
    if (value.offer.features.indexOf(features[i]) === -1) {
      return false;
    }
  }
  return true;
};

const getFilteredData = (value, filter) => {
  return filterByType(value, filter.housingType) && filterByPrice(value, filter.housingPrice)
    && filterByGuests(value, filter.housingGuests) && filterByRooms(value, filter.housingRooms)
    && filterByFeatures(value, filter.housingFeatures);
};

export { getFilterObject, getFilteredData };
