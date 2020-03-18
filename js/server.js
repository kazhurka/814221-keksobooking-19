'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  /**
   * Создает xhr и обрабатывает ответ сервера.
   * @param {function} xhrSuccessHandler -  вызывается в случае успеха
   * @param {function} xhrErrorHandler  - вызывается в случае ошибки
   * @return {object} - xhr
   */
  var setXhr = function (xhrSuccessHandler, xhrErrorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          xhrSuccessHandler(xhr.response);
          break;
        default:
          xhrErrorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        xhrErrorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        xhrErrorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;
    });
    return xhr;
  };


  /**
   * Обработчик загрузки данных о предложениях с сервера.
   * @param {function} successHandler - обработчик успешной загрузки данных
   * @param {function} errorHandler  - обработчик ошибки при загрузке данных
   */
  var load = function (successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = setXhr(successHandler, errorHandler);

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
    var xhr = setXhr(successHandler, errorHandler);
    var URL = 'https://js.dump.academy/keksobooking';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.server = {
    load: load,
    upload: upload,
  };

})();
