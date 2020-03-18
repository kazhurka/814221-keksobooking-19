'use strict';

(function () {

  /**
   * Функция, которая включает или выключает форму.
   * @param {boolean} enable - если enable, то включает форму, если false - выключает.
   */
  var enableForm = function (enable) {
    var formElement = document.querySelector('.ad-form');
    if (!enable) {
      formElement.classList.add('ad-form--disabled');
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
        formElement.reset();
        window.photo.remove();
      });
    } else {
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.removeAttribute('disabled');
        formElement.classList.remove('ad-form--disabled');
      });
    }
  };

  var capacityInput = document.querySelector('#capacity');

  /**
   * Обработчик, которые валидирует поля: количество комнат и количество гостей.
   */
  var roomGuestChangeHandler = function () {
    var Rooms = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
    var rooms = parseInt(document.querySelector('#room_number').value, 10);
    var guests = parseInt(document.querySelector('#capacity').value, 10);
    if ((Rooms[rooms].indexOf(guests)) === -1) {
      if (rooms < guests) {
        capacityInput.setCustomValidity('Увеличьте количество комнат или уменьшите количество гостей');
      } else {
        capacityInput.setCustomValidity('Для такого количества комнат доступно только значение "не для гостей"');
      }
    } else {
      capacityInput.setCustomValidity('');
    }
  };

  var checkoutTime = document.querySelector('#timeout');
  var checkinTime = document.querySelector('#timein');

  /**
   *   Обрабочик, который устанавливает зависимость между полями формы: врема заезда и время выезда.
   * @param {object} evt - объект события.
   */
  var timesChangeHandler = function (evt) {
    if (evt.target.matches('#timein')) {
      checkoutTime.value = checkinTime.value;
    } else {
      checkinTime.value = checkoutTime.value;
    }
  };

  /**
   * Добавляет значение в атрибут 'min' поля 'цена'.
   * @param {number} price - минимальная цена жилья
   */
  var setPrice = function (price) {
    var apartmenttPrice = document.querySelector('#price');
    apartmenttPrice.setAttribute('min', price);
    apartmenttPrice.setAttribute('placeholder', price);
  };

  /**
   * Обработчик, устанавливает зависимость поля  'цена' от  поля 'тип жилья'.
   * @param {object} evt - объект события.
   */
  var apartmentPriceChangeHandler = function (evt) {
    var type = evt.target.value;
    var Prices = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
    };
    setPrice(Prices[type]);
  };

  var form = document.querySelector('.ad-form');
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  /**
   * Обработчик  отправки формы на сервер, выводит  на экран сообщения о статусе отправки.
   * @param {object} evt - объект события
   */
  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var messageSuccess = messageSuccessTemplate.cloneNode(true);
    var messageError = messageErrorTemplate.cloneNode(true);

    /**
     * Удаляет сообщение о статусе отправки из DOM дерева.
     */
    var closeMessage = function () {
      var successWindow = document.querySelector('.success');
      var errorWindow = document.querySelector('.error');
      if (main.contains(successWindow)) {
        main.removeChild(successWindow);
      } else {
        main.removeChild(errorWindow);
      }
    };

    /**
     * Обрабочик закрытия сообщения по нажатию на клавишу Escape.
     * @param {object} evtClose - объект события
     */
    var messageKeyCloseHandler = function (evtClose) {
      if (evtClose.key === window.util.ESCAPE) {
        closeMessage();
        document.removeEventListener('keydown', messageKeyCloseHandler);
        document.removeEventListener('click', messageMouseCloseHandler);
      }
    };

    /**
     * Обработчик закрытия сообщения по нажатию на кнопку мыши.
     */
    var messageMouseCloseHandler = function () {
      closeMessage();
      document.removeEventListener('click', messageMouseCloseHandler);
      document.removeEventListener('keydown', messageKeyCloseHandler);
    };

    /**
     * Обработчик успешной отправки формы.
     */
    var messageSuccessHandler = function () {
      document.querySelector('main').appendChild(messageSuccess);
      document.addEventListener('keydown', messageKeyCloseHandler);
      document.addEventListener('click', messageMouseCloseHandler);
      window.map.enablePage(false);
    };

    /**
     * Обработчик ошибки в случае отправки формы.
     *  @param {string} errorText - сообщение об ошибке, переданное сервером.
     */
    var messageErrorHandler = function (errorText) {
      document.querySelector('main').appendChild(messageError);
      var text = document.createElement('p');
      text.textContent = errorText;
      var style = text.style;
      style.left = 0;
      style.right = 0;
      style.color = '#ffffff;';
      style.fontSize = '50 px';
      style.fontWeight = '700';
      style.color = '#ff5635';
      messageError.appendChild(text);
      document.addEventListener('keydown', messageKeyCloseHandler);
      document.addEventListener('click', messageMouseCloseHandler);
    };

    window.server.upload(new FormData(form), messageSuccessHandler, messageErrorHandler);
  };
  document.querySelector('#room_number').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#capacity').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#timein').addEventListener('change', timesChangeHandler);
  document.querySelector('#timeout').addEventListener('change', timesChangeHandler);
  document.querySelector('#type').addEventListener('change', apartmentPriceChangeHandler);
  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    window.map.enablePage();
  });
  form.addEventListener('submit', formSubmitHandler);

  window.form = {
    enable: enableForm,
  };

})();
