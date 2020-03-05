'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  window.load = function (successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          successHandler(xhr.response);
          break;

        default:
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL);
    xhr.send();
  };


  window.load.upload = function (data, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking';
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
