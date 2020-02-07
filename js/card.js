'use strict';
//
(function () {

  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
  window.data.getApartmentOffer();
  /**
   * Добавляет карточку с предложением в DOM
   * @param {object} card - сформированная карточка с предложением
   * @return {cardElement} - карточка как элемент DOM
   */
  var renderCard = function (card) {
    var cardElement = cardOfferTemplate.cloneNode(true);
    /**
     * Проверяет есть ли определенная опция из массива возможных в карточке с предложением,
     *  и оставляет или удаляет соотвествующий ей DOM элемент.
     * @param {array} features - массив со всеми  возможными опциями для жилья
     */
    var getFeaturesinElement = function (features) {
      features.forEach(function (feature) {
        if (card.offer.features.indexOf(feature, 0) === -1) {
          cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--' + feature));
        }
      });
    };
    var cardPhotosTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
    var cardImgTemplate = cardPhotosTemplate.querySelector('img');
    /**
     * Добавляет фото из массива в карточку
     * @param {array} photos -набор фотографий жилья для примера
     */
    var getPhotosInElement = function (photos) {
      photos.forEach(function (item) {
        var imgOfElement = cardImgTemplate.cloneNode(true);
        imgOfElement.setAttribute('src', item);
        cardElement.querySelector('.popup__photos').appendChild(imgOfElement);
      });
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos').querySelector('img'));
    };
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + 'Р/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.APARTMENT_TYPES_RUSSIAN[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнат(ы) для' + ' ' + card.offer.guests + ' ' + 'гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + card.offer.checkout;
    getFeaturesinElement(window.data.APARTMENT_EXAMPLE_FEATURES);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    getPhotosInElement(window.data.PHOTO_EXAMPLES);
    return cardElement;
  };

  window.card = {
    renderCard: renderCard,
  };
})();
