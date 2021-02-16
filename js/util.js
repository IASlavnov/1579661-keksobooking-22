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

export { getRandomInt, getCoordinate, getRandomArrayElement, getRandomArray };
