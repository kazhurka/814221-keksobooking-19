'use strict';
//
(function () {

  var pinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  /**
   * Создает метку на карту для предложения о сдаче жилья
   * @param {object} card - сформированная карточка с предложением
   * @return {pinElement} - готовая метка
   */
  var renderPin = function (card) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.style.left = card.offer.location.x - window.data.X_OFFSET + 'px';
    pinElement.style.top = card.offer.location.y - window.data + 'px';
    pinElement.querySelector('img').setAttribute('src', card.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', card.offer.title);
    pinElement.id = 'pin' + card.offer.id;

    return pinElement;
  };


  var renderPinElements = function (offers) {
    var pinElements = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      fragment.appendChild(renderPin(offer));
    });

    pinElements.appendChild(fragment);

  };

  window.pin = {
    renderPin: renderPin,
    renderPinElements: renderPinElements,
  };
})();
