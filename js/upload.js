'use strict';
(function () {

  var URL = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
          break;

        default:
          errorHandler(xhr.response);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
