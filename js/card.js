'use strict';
(function () {
  var ALL_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var SIGNS_NUMBER_TO_CUT = 4;
  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardPhotosTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
  var cardImgTemplate = cardPhotosTemplate.querySelector('img');
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

    var getFeaturesInElement = function (features) {
      ALL_FEATURES.forEach(function (feature) {
        if (features.indexOf(feature, 0) === -1) {
          cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--' + feature));
        }

      });
      if (card.offer.features.length === 0) {
        cardElement.querySelector('.popup__features').remove();
      }
    };


    var cardPhotos = cardElement.querySelector('.popup__photos');
    /**
     * Добавляет фото из массива в карточку
     * @param {array} photosData - фотографии жилья
     */
    var getPhotosInElement = function (photosData) {
      photosData.forEach(function (item) {
        var imgOfElement = cardImgTemplate.cloneNode(true);
        imgOfElement.setAttribute('src', item);
        cardPhotos.appendChild(imgOfElement);

      });
      if (card.offer.photos.length === 0) {
        cardPhotos.remove();
      }
      cardPhotos.removeChild(cardPhotos.querySelector('img'));
    };
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + 'Р/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.APARTMENT_RUSSIAN_TYPES[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнат(ы) для' + ' ' + card.offer.guests + ' ' + 'гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + card.offer.checkout;
    getFeaturesInElement(card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    getPhotosInElement(card.offer.photos);
    cardElement.querySelector('.popup__close').addEventListener('click', cardButtonCloseHandler);
    document.addEventListener('keydown', cardKeyCloseHandler);
    return cardElement;
  };

  /**
   * Дезактивирует пин(убирает соотвествующий класс у DOM элемента)
   */
  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  /**
   * Обработчик закрытия карточки по клику  на кнопку 'крестик' .
   * @param {object} evt - объект события.
   */
  var cardButtonCloseHandler = function () {
    document.querySelector('.map__pins').removeChild(document.querySelector('.map__card'));
    removeActivePin();
  };

  /**
   *
   * Обработчик закрытия карточки по нажатию клавиши 'Escape'.
   *  @param {object} evt - объект события.
   */
  var cardKeyCloseHandler = function (evt) {
    if (evt.key === window.util.ESCAPE) {
      document.querySelector('.map__pins').removeChild(document.querySelector('.map__card'));
      removeActivePin();
    }
  };

  /**
   *
   * Обработчик отрисовки и открытия  соотвествующей карточки, по клику на метку объявления.
   *  @param {object} evt - объект события.
   */
  var cardOpenHandler = function (evt) {
    var map = document.querySelector('.map__pins');
    if (evt.target && evt.target.closest('.map__pin--offer')) {
      var id = evt.target.closest('.map__pin').id.slice(SIGNS_NUMBER_TO_CUT);
      var index = parseInt(id, 10) - 1;
      var cardData = window.data.filteredOffers[index];
      removeCard();
      map.appendChild(renderCard(cardData));
      removeActivePin();
      evt.target.closest('button').classList.add('map__pin--active');
    }
  };
  /**
   * Удаляет  открытую карточку с предложением  с карты.
   */
  var removeCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__pins').removeChild(document.querySelector('.map__card'));
    }

  };

  window.card = {
    render: renderCard,
    openHandler: cardOpenHandler,
    remove: removeCard,
  };
})();
