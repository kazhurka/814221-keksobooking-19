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
  var createCardPinObject = function () {

    var cardPinObject = {};
    var pins = [];
    var cards = [];
    for (var i = 0; i < window.data.OBJECTS_QUANTITY; i++) {
      pins[i] = (window.pin.renderPin(window.data.apartmentOffers[i]));
      cards[i] = (window.card.renderCard(window.data.apartmentOffers[i]));
      cardPinObject[pins[i].id] = cards[i];
    }
    return cardPinObject;
  };

  var enableForm = function (enable) {
    var formElement = document.querySelector('.ad-form');
    if (enable) {
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.removeAttribute('disabled');
        formElement.classList.remove('ad-form--disabled');
        formElement.querySelector('#address').setAttribute('value', Math.floor(MainPinValues.WIDTH + MainPinValues.X_OFFSET) + ',' +
          Math.floor(MainPinValues.HEIGHT + MainPinValues.Y_OFFSET));
        createCardPinObject();
      });
    } else {
      formElement.classList.add('ad-form--disabled');
      document.querySelectorAll('.ad-form__element').forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
        formElement.querySelector('#address').setAttribute('value', MainPinValues.X_START_VALUE + Math.floor(MainPinValues.WIDTH / 2) + ',' +
          (MainPinValues.Y_START_VALUE + Math.floor(MainPinValues.HEIGHT / 2)));
      });
    }
  };


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
  var timesChangeHandler = function (evt) {
    var checkinIndexTime = document.querySelector('#timein').selectedIndex;
    var checoutIndexTime = document.querySelector('#timeout').selectedIndex;
    if (evt.target.matches('#timein')) {
      var checkoutTime = document.querySelector('#timeout');
      checkoutTime.selectedIndex = checkinIndexTime;
    } else {
      var checkinTime = document.querySelector('#timein');
      checkinTime.selectedIndex = checoutIndexTime;
    }
  };
  var setPrice = function (price) {
    var apartmenttPrice = document.querySelector('#price');
    apartmenttPrice.setAttribute('min', price);
    apartmenttPrice.setAttribute('placeholder', price);
  };
  var apartmentPriceChangeHandler = function () {
    var typeIndex = document.querySelector('#type').selectedIndex;
    if (typeIndex === 0) {
      setPrice(0);
    }
    if (typeIndex === 1) {
      setPrice(1000);
    }
    if (typeIndex === 2) {
      setPrice(5000);
    }
    if (typeIndex === 3) {
      setPrice(10000);
    }
  };
  document.querySelector('#room_number').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#capacity').addEventListener('change', roomGuestChangeHandler);
  document.querySelector('#timein').addEventListener('change', timesChangeHandler);
  document.querySelector('#timeout').addEventListener('change', timesChangeHandler);
  document.querySelector('#type').addEventListener('change', apartmentPriceChangeHandler);

  window.form = {
    enableForm: enableForm,
  };

})();
