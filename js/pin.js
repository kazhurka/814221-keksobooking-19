'use strict';
(function () {
  var Coordinates = {
    X_OFFSET: 25,
    Y_OFFSET: 70,
  };
  var pinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  /**
   * Создает метку на карту для предложения о сдаче жилья
   * @param {object} card - сформированная карточка с предложением
   * @param {number} index - счетчик, для записи порядкового номера  в id
   * @return {pinElement} - готовая метка
   */
  var renderPin = function (card, index) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.classList.add('map__pin--offer');
    pinElement.style.left = card.location.x - Coordinates.X_OFFSET + 'px';
    pinElement.style.top = card.location.y - Coordinates.Y_OFFSET + 'px';
    pinElement.querySelector('img').setAttribute('src', card.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', card.offer.title);
    pinElement.id = 'pin-' + (parseInt(index, 10) + 1);
    /* (чтобы начинать названия  с 1 , как  в getApartmentOffers
      прибавляется единица для картинок)*/
    return pinElement;
  };

  /**
   *Отрисовывает метки на карте, согласно полученными данным
   * @param {array} offers - готовый массив предложений с данными
   * @return {pinElements} - коллекция готовых меток (DOM элементы)
   */
  var renderPinElements = function (offers) {
    var pinElements = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer, index) {
      if (offer.offer) {
        fragment.appendChild(renderPin(offer, index));
      }

    });

    pinElements.appendChild(fragment);
    return pinElements;
  };

  /**
   * Удаляет все метки(кроме главной) с карты
   */
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if ((item.classList.contains('map__pin--main')) === false) {
        document.querySelector('.map__pins').removeChild(item);
      }
    });
  };

  window.pin = {
    renderElements: renderPinElements,
    remove: removePins,
  };
})();
