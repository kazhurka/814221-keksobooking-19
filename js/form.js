'use strict';

(function () {
  /**
   * Функция, которая включает или выключает форму.
   * @param {boolean} enable - если false, то выключает форму, если true - включает.
   */
  var enableForm = function (enable) {
    var formElement = document.querySelector('.ad-form');
    if (enable === false) {
      formElement.classList.add('ad-form--disabled');
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
        formElement.reset();
      });
    } else {
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.removeAttribute('disabled');
        formElement.classList.remove('ad-form--disabled');
      });
    }
  };

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
        document.querySelector('#capacity').setCustomValidity('Увеличьте количество комнат или уменьшите количество гостей');
      } else {
        document.querySelector('#capacity').setCustomValidity('Для такого количества комнат доступно только значение "не для гостей"');
      }
    } else {
      document.querySelector('#capacity').setCustomValidity('');
    }
  };

  var checkoutTime = document.querySelector('#timeout');
  var checkinTime = document.querySelector('#timein');

  /**
   *   Обрабочик, который устанавливает зависимость между полями формы: врема заезда и время выезда.
   * @param {object} evt - объект события.
   */
  var timesChangeHandler = function (evt) {
    var checkinIndexTime = checkinTime.selectedIndex;
    var checkoutIndexTime = checkoutTime.selectedIndex;
    if (evt.target.matches('#timein')) {
      checkoutTime.selectedIndex = checkinIndexTime;
    } else {
      checkinTime.selectedIndex = checkoutIndexTime;
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
    var typeIndex = evt.target.selectedIndex;
    var Prices = {
      0: 0,
      1: 1000,
      2: 5000,
      3: 10000,
    };
    for (var i = 0; i < 4; i++) {
      if (typeIndex === i) {
        setPrice(Prices[i]);
      }
    }
  };
  var form = document.querySelector('.ad-form');

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
    var messageSuccess = messageSuccessTemplate.cloneNode(true);
    var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var messageError = messageErrorTemplate.cloneNode(true);
    var closeMessage = function () {
      if ((document.querySelector('main').querySelector('.success'))) {
        document.querySelector('main').removeChild(document.querySelector('.success'));
      } else {
        document.querySelector('main').removeChild(document.querySelector('.error'));
      }
    };
    var messageKeyCloseHandler = function (evtCl) {
      if (evtCl.key === 'Escape') {
        closeMessage();
      }
    };
    var messageMouseCloseHandler = function () {
      closeMessage();

    };
    window.upload(new FormData(form), function () {
      document.querySelector('main').appendChild(messageSuccess);
      document.addEventListener('keydown', messageKeyCloseHandler);
      document.addEventListener('mousedown', messageMouseCloseHandler);
      window.map.enablePage(false);
    },

    function () {
      document.querySelector('main').appendChild(messageError);
      document.addEventListener('keydown', messageKeyCloseHandler);
      document.addEventListener('mousedown', messageMouseCloseHandler);

    });
  };
  document.querySelector('#room_number').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#capacity').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#timein').addEventListener('change', timesChangeHandler);
  document.querySelector('#timeout').addEventListener('change', timesChangeHandler);
  document.querySelector('#type').addEventListener('change', apartmentPriceChangeHandler);
  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    form.reset();
  });
  form.addEventListener('submit', formSubmitHandler);

  window.form = {
    enableForm: enableForm,
  };

})();
