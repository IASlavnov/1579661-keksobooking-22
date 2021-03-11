const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');

// Выбор и отображение аватара
const avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
// Выбор и отображение фотографии жилья
const photoChooser = adForm.querySelector('.ad-form__upload input[type=file]');
const photoPreview = adForm.querySelector('.ad-form__photo');

// Проверка типа файла
const matches = (name) => {
  return FILE_TYPES.some(it => name.endsWith(it));
};

// Загрузка превью для аватара
const uploadAvatar = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

// Загрузка превью фотографии жилья
const uploadPhoto = () => {
  photoChooser.addEventListener('change', () => {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const newPhotoItem = document.createElement('img');
        newPhotoItem.width = 70;
        newPhotoItem.height = 70;
        newPhotoItem.src = reader.result;
        newPhotoItem.alt = 'Фотография жилья';
        photoPreview.appendChild(newPhotoItem);
      });

      reader.readAsDataURL(file);
    }
  });
};

const uploadPreviews = () => {
  uploadAvatar();
  uploadPhoto();
};

const resetPreviews = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  if (photoPreview.firstChild) {
    photoPreview.removeChild(photoPreview.firstChild);
  }
};

export { uploadPreviews, resetPreviews };
