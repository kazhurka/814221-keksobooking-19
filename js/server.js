'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  /**
   * Обработчик загрузки данных о предложениях с сервера.
   * @param {function} successHandler - обработчик успешной загрузки данных
   * @param {function} errorHandler  - обработчик ошибки при загрузке данных
   */
  var load = function (successHandler, errorHandler) {
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

  /**
   * Обработчик отправки данных формы на сервер.
   * @param {object} data - данные полученные с формы
   * @param {function} successHandler  - обработчки успешной отправки данных на сервер
   * @param {function} errorHandler -  обработчик ошибки при отправке данных на сервер
   */
  var upload = function (data, successHandler, errorHandler) {
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
  window.server = {
    load: load,
    upload: upload,
  };

})();
