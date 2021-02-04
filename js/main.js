const getRandomInt = function (min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон значений должен быть больше или равен 0');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = function (min, max, decimal) {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон значений должен быть больше или равен 0');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};

try {
  alert(getRandomInt(5, 10));
  alert(getRandomFloat(10, 100, 3));
}
catch (Error) {
  alert(Error.message);
}
