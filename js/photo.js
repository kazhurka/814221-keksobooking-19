'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileOfferChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

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
        photo.width = '70';
        photo.height = '70';
        photoPreview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  };

  fileAvatarChooser.addEventListener('change', uploadAvatarHandler);
  fileOfferChooser.addEventListener('change', uploadPhotoHandler);
})();
