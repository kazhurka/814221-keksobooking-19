'use strict';
(function () {

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
  var cardPinObject = createCardPinObject();
  var closeMouseCardHandler = function (evt) {
    if (evt.button === 0) {
      var map = document.querySelector('.map__pins');
      map.removeChild(map.querySelector('.map__card'));
    }
  };

  var closeKeyCardHandler = function (evt) {
    if (evt.key === 'Escape') {
      var map = document.querySelector('.map__pins');
      map.removeChild(map.querySelector('.map__card'));
      evt.target.removeEventListener('keydown', closeKeyCardHandler);
    }
  };
  var openCardHandler = function (evt) {
    if (evt.button === 0) {
      var map = document.querySelector('.map__pins');
      if (
        evt.target &&
        (evt.target.matches('.map__pin') || evt.target.parentNode.matches('.map__pin')) &&
        !(evt.target.matches('.map__pin--main') || evt.target.parentNode.matches('.map__pin--main'))
      ) {

        if (evt.target.matches('.map__pin')) {
          var cardElement = cardPinObject[evt.target.id];
        } else {
          cardElement = cardPinObject[evt.target.parentNode.id];
        }
        if (document.querySelector('.map__card')) {
          map.removeChild(map.querySelector('.map__card'));
        }
        var pinElements = document.querySelector('.map__pins');
        var fragment = document.createDocumentFragment();
        fragment.appendChild(cardElement);
        pinElements.appendChild(fragment);
        document.querySelector('.map__card').querySelector('.popup__close').addEventListener('mousedown', closeMouseCardHandler);
        document.addEventListener('keydown', closeKeyCardHandler);

      }
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var enablePage = function (enable) {
    var map = document.querySelector('.map');
    if (enable) {
      document.querySelector('.map__filters').classList.remove('map__filters--disabled');
      window.form.enableForm(true);
      map.classList.remove('map--faded');
      window.pin.renderPinElements(window.data.apartmentOffers);
    } else {
      window.form.enableForm();
      document.querySelector('.map__filters').classList.add('map__filters--disabled');
    }
    mainPin.removeEventListener('click', pinMainClickHandler);
    mainPin.removeEventListener('keydown', pinMainKeydownHandler);
  };
  enablePage();


  var pinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      enablePage(true);
    }
  };

  var pinMainKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      enablePage(true);
    }
  };

  mainPin.addEventListener('mousedown', pinMainClickHandler);
  mainPin.addEventListener('keydown', pinMainKeydownHandler);
  document.querySelector('.map__pins').addEventListener('click', openCardHandler);
})();
