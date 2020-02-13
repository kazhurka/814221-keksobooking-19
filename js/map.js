'use strict';
(function () {

  var MainPinValues = {
    WIDTH: 65,
    HEIGHT: 65,
    X_START_VALUE: 570,
    Y_START_VALUE: 375,
    X_OFFSET: 33,
    Y_OFFSET: 65,
  };

  var mainPin = document.querySelector('.map__pin--main');
  /**
   * Функция активациии или дезактивации страницы.
   * @param {boolean} enable - если true, то страница активируется, если false - дезактивируется.
   */
  var enablePage = function (enable) {
    var formElement = document.querySelector('.ad-form');
    var map = document.querySelector('.map');
    if (enable === false) {
      window.form.enableForm(false);
      document.querySelector('.map__filters').classList.add('map__filters--disabled');
      formElement.querySelector('#address').setAttribute('value', 0 + ',' + 0);
    } else {
      document.querySelector('.map__filters').classList.remove('map__filters--disabled');
      window.form.enableForm();
      formElement.querySelector('#address').setAttribute('value', Math.floor(MainPinValues.WIDTH + MainPinValues.X_OFFSET) + ',' +
        Math.floor(MainPinValues.HEIGHT + MainPinValues.Y_OFFSET));
      map.classList.remove('map--faded');
      window.pin.renderElements(window.data.getApartmentOffers(window.data.OBJECTS_QUANTITY));

    }
    mainPin.removeEventListener('mousedown', pinMainClickHandler);
    mainPin.removeEventListener('keydown', pinMainKeydownHandler);

  };
  enablePage(false);

  /**
   *
   * Обработчик, который при нажатии левой кнопкой мыши на главную метку активирует страницу.
   * @param {object} evt - объект события.
   */
  var pinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      enablePage(true);
    }
  };

  /**
   * Обрабочик, который при нажатии клавишей 'Enter' на главную метку активирует страницу.
   *  @param {object} evt - объект события.
   */
  var pinMainKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      enablePage(true);
    }
  };
  mainPin.addEventListener('mousedown', pinMainClickHandler);

  mainPin.addEventListener('keydown', pinMainKeydownHandler);
  document.querySelector('.map__pins').addEventListener('click', window.card.openHandler);


  /**
   * Обработчик, который перемещет главную метку по карте.
   *  @param {object} evt - объект события.
   */
  mainPin.addEventListener('mousedown', function (evt) {
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

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      document.querySelector('.ad-form').querySelector('#address').setAttribute('value',
          ((mainPin.offsetLeft - shift.x) + MainPinValues.X_OFFSET) + ',' +
          ((mainPin.offsetTop - shift.y) + MainPinValues.Y_OFFSET));
    };
    var pinMoveHandler = function (moveEvt) {
      if (parseInt(mainPin.style.left.slice(0, -2), 10) > 1166) {
        mainPin.style.left = 1166 + 'px';
      }
      if (parseInt(mainPin.style.left.slice(0, -2), 10) < -30) {
        mainPin.style.left = -30 + 'px';
      }
      if (parseInt(mainPin.style.top.slice(0, -2), 10) > 565) {
        mainPin.style.top = 565 + 'px';

      }
      if (parseInt(mainPin.style.top.slice(0, -2), 10) < 65) {
        mainPin.style.top = 65 + 'px';

      } else {

        moveEvt.preventDefault();
        renderAddress(moveEvt);
      }
    };
    var pinUpHandler = function (upEvt) {
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
      renderAddress(upEvt);
    };
    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);

  });
})();
