import { getAds } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const ads = getAds();
const adsListFragment = document.createDocumentFragment();

ads.forEach(({ author, offer }) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  offer.price ? adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : adElement.querySelector('.popup__text--price').remove();
  adElement.querySelector('.popup__type').textContent = offer.type;
  offer.rooms && offer.guests ? adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей` : adElement.querySelector('.popup__text--capacity').remove();
  offer.checkin && offer.checkout ? adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : adElement.querySelector('.popup__text--time').remove();
  if (offer.features.length) {
    if (!offer.features.includes('wifi')) {
      adElement.querySelector('.popup__feature--wifi').remove();
    }
    if (!offer.features.includes('dishwasher')) {
      adElement.querySelector('.popup__feature--dishwasher').remove();
    }
    if (!offer.features.includes('parking')) {
      adElement.querySelector('.popup__feature--parking').remove();
    }
    if (!offer.features.includes('washer')) {
      adElement.querySelector('.popup__feature--washer').remove();
    }
    if (!offer.features.includes('elevator')) {
      adElement.querySelector('.popup__feature--elevator').remove();
    }
    if (!offer.features.includes('conditioner')) {
      adElement.querySelector('.popup__feature--conditioner').remove();
    }
  } else {
    adElement.querySelector('.popup__features').remove();
  }
  adElement.querySelector('.popup__description').textContent = offer.description;
  const popupPhotos = adElement.querySelector('.popup__photos');
  if (offer.photos.length) {
    adElement.querySelector('.popup__photo').src = offer.photos[0];
    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const newPhoto = document.createElement('img');
        newPhoto.classList.add('popup__photo');
        newPhoto.width = 45;
        newPhoto.height = 40;
        newPhoto.src = offer.photos[i];
        newPhoto.alt = 'Фотография жилья';
        popupPhotos.appendChild(newPhoto);
      }
    }
  } else {
    popupPhotos.remove();
  }
  adElement.querySelector('.popup__avatar').src = author.avatar;
  adsListFragment.appendChild(adElement);
});

mapCanvas.appendChild(adsListFragment.firstElementChild);
