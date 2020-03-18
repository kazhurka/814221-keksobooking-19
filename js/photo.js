'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WIDTH = '70';
  var PHOTO_HEIGHT = '70';
  var fileOfferChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  /**
   * Обрабочик загрузки аватара в форме .
   */
  var uploadAvatarHandler = function () {
    var file = fileAvatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  /**
   * Обработчик загрузки фотографий жилья в форме.
   */
  var uploadPhotoHandler = function () {
    var file = fileOfferChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        var photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = PHOTO_WIDTH;
        photo.height = PHOTO_HEIGHT;
        photoPreview.textContent = '';
        photoPreview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  };

  /**
   * Сбрасывает поле загрузки фотографий к изначалному состоянию.
   */
  var removePhotos = function () {
    while (photoPreview.firstChild) {
      photoPreview.removeChild(photoPreview.firstChild);
    }
    avatarPreview.src = 'img/muffin-grey.svg';
  };
  fileAvatarChooser.addEventListener('change', uploadAvatarHandler);
  fileOfferChooser.addEventListener('change', uploadPhotoHandler);
  window.photo = {
    remove: removePhotos,
  };
})();
