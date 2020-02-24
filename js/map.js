'use strict';
(function () {

  var MainPinValues = {
    WIDTH: 65,
    HEIGHT: 65,
    X_START_VALUE: 570,
    Y_START_VALUE: 375,
    X_OFFSET: 33,
    Y_OFFSET: 87,
    Y_MAX_VALUE: 630,
    Y_MIN_VALUE: 130,
    X_MIN_VALUE: 0,
    X_MAX_VALUE: 1200,
  };

  var mainPin = document.querySelector('.map__pin--main');
  /**
   * Функция активациии или дезактивации страницы.
   * @param {boolean} enable - если true, то страница активируется, если false - дезактивируется.
   */
  var enablePage = function (enable) {
    mainPin.addEventListener('click', pinMainClickHandler);
    var formElement = document.querySelector('.ad-form');
    var map = document.querySelector('.map');
    if (enable === false) {
      window.form.enableForm(false);
      document.querySelector('.map__filters').classList.add('map__filters--disabled');
      formElement.querySelector('#address').setAttribute('value', 0 + ',' + 0);
      map.classList.add('map--faded');
      var pins = map.querySelectorAll('.map__pin');
      pins.forEach(function (item) {
        if ((item.classList.contains('map__pin--main')) === false) {
          document.querySelector('.map__pins').removeChild(item);
        }
        mainPin.style.left = '570px';
        mainPin.style.top = '375px';
        mainPin.addEventListener('click', pinMainClickHandler);
      });

    } else {
      document.querySelector('.map__filters').classList.remove('map__filters--disabled');
      window.form.enableForm();
      formElement.querySelector('#address').setAttribute('value', Math.floor(MainPinValues.WIDTH + MainPinValues.X_OFFSET) + ',' +
        Math.floor(MainPinValues.HEIGHT + MainPinValues.Y_OFFSET));
      map.classList.remove('map--faded');
      window.pin.renderElements(window.data.offers);

    }

  };
  enablePage(false);

  /**
   *
   * Обработчик, который при нажатии левой кнопкой мыши на главную метку активирует страницу.
   * @param {object} evt - объект события.
   */
  var pinMainClickHandler = function () {
    enablePage(true);
    mainPin.removeEventListener('click', pinMainClickHandler);
  };


  mainPin.addEventListener('click', pinMainClickHandler);
  document.querySelector('.map__pins').addEventListener('click', window.card.openHandler);


  /**
   * Обработчик, который перемещет главную метку по карте.
   *  @param {object} evt - объект события.
   */
  mainPin.addEventListener('mousedown', function (evt) {
    if (document.querySelector('.map').classList.contains('map--faded') === false) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      /**
       * Функция, которая считает и добавляет координаты метки жилья  в поле 'адрес'.
        @param {object} event - объект события из обработчика, в котором вызывается данная функция.
       */
      var renderAddress = function (event) {
        var shift = {
          x: startCoords.x - event.clientX,
          y: startCoords.y - event.clientY
        };

        startCoords = {
          x: event.clientX,
          y: event.clientY
        };
        var top = (mainPin.offsetTop - shift.y);
        var left = (mainPin.offsetLeft - shift.x);
        if (left < (MainPinValues.X_MIN_VALUE - MainPinValues.X_OFFSET)) {
          left = MainPinValues.X_MIN_VALUE - MainPinValues.X_OFFSET;
        }
        if (left > (MainPinValues.X_MAX_VALUE - MainPinValues.X_OFFSET)) {
          left = MainPinValues.X_MAX_VALUE - MainPinValues.X_OFFSET;
        }
        if ((top < MainPinValues.Y_MIN_VALUE - MainPinValues.Y_OFFSET)) {
          top = MainPinValues.Y_MIN_VALUE - MainPinValues.Y_OFFSET;
        }
        if ((top > MainPinValues.Y_MAX_VALUE - MainPinValues.Y_OFFSET)) {
          top = MainPinValues.Y_MAX_VALUE - MainPinValues.Y_OFFSET;
        }
        mainPin.style.left = left + 'px';
        mainPin.style.top = top + 'px';
        document.querySelector('.ad-form').querySelector('#address').setAttribute('value',
            (left + MainPinValues.X_OFFSET) + ',' +
            (top + MainPinValues.Y_OFFSET));
      };

      var pinMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        renderAddress(moveEvt);
      };


      var pinUpHandler = function (upEvt) {
        document.removeEventListener('mousemove', pinMoveHandler);
        document.removeEventListener('mouseup', pinUpHandler);
        renderAddress(upEvt);
      };
      document.addEventListener('mousemove', pinMoveHandler);
      document.addEventListener('mouseup', pinUpHandler);
    }
  });

  window.map = {
    enablePage: enablePage,
  };
})();
