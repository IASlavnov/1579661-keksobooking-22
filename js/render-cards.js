const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const adsListFragment = document.createDocumentFragment();

const renderFeatures = (element, array) => {
  element.innerHTML = '';
  const newFeaturesFragment = document.createDocumentFragment();
  array.forEach((value) => {
    const newFeatureItem = document.createElement('li');
    newFeatureItem.classList.add('popup__feature');
    newFeatureItem.classList.add(`popup__feature--${value}`);
    newFeaturesFragment.appendChild(newFeatureItem);
  });
  return newFeaturesFragment;
};

const renderPhotos = (element, array) => {
  element.innerHTML = '';
  const newPhotosFragment = document.createDocumentFragment();
  array.forEach((value) => {
    const newPhotoItem = document.createElement('img');
    newPhotoItem.classList.add('popup__photo');
    newPhotoItem.width = 45;
    newPhotoItem.height = 40;
    newPhotoItem.src = value;
    newPhotoItem.alt = 'Фотография жилья';
    newPhotosFragment.appendChild(newPhotoItem);
  });
  return newPhotosFragment;
};

const renderCard = (element, { author, offer }) => {
  element.querySelector('.popup__avatar').src = author.avatar;
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  offer.price ? element.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : element.querySelector('.popup__text--price').remove();
  element.querySelector('.popup__type').textContent = offer.type;
  offer.rooms && offer.guests ? element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей` : element.querySelector('.popup__text--capacity').remove();
  offer.checkin && offer.checkout ? element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : element.querySelector('.popup__text--time').remove();

  const popupFeatures = element.querySelector('.popup__features');
  if (Array.isArray(offer.features) && offer.features.length) {
    popupFeatures.appendChild(renderFeatures(popupFeatures, offer.features));
  } else {
    popupFeatures.remove();
  }

  element.querySelector('.popup__description').textContent = offer.description;

  const popupPhotos = element.querySelector('.popup__photos');
  if (Array.isArray(offer.photos) && offer.photos.length) {
    popupPhotos.appendChild(renderPhotos(popupPhotos, offer.photos));
  } else {
    popupPhotos.remove();
  }

  return element;
};

const renderCards = (array) => {
  array.forEach(({ author, offer }) => {
    const cardElement = cardTemplate.cloneNode(true);
    adsListFragment.appendChild(renderCard(cardElement, { author, offer }));
  });
  return mapCanvas.appendChild(adsListFragment.firstElementChild);
};

export { renderCards };
