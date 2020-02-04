'use strict';

var APARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var APARTMENT_TYPES_RUSSIAN = {
  'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало',
};
var CHECK_IN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var APARTMENT_EXAMPLE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTO_EXAMPLES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var OBJECTS_QUANTITY = 8;
var Prices = {
  MIN_PRICE: 500,
  MAX_PRICE: 1000,
};
var MainPinValues = {
  WIDTH: 65,
  HEIGHT: 65,
  X_START_VALUE: 570,
  Y_START_VALUE: 375,
  X_OFFSET: 33,
  Y_OFFSET: 65,
};
var Coordinates = {
  Y_MIN_VALUE: 130,
  Y_MAX_VALUE: 630,
  X_MAX_VALUE: 1200,
  X_MIN_VALUE: 0,
  X_OFFSET: 25,
  Y_OFFSET: 70,
};

/**
 * Находит случайное значение в заданном массиве
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} - случайное значение
 */
var getRandomNumber = function (min, max) {

  return Math.floor(Math.random() * (max - min) + min);

};

/**
 * Генерирует  массив определенной длины со случайными значениями из заданного массива
 * @param {*} arr - заданный массив
 * @param {*} newLength - длина нового массива
 * @return {newArr} -сгенерированный массив
 */

var getRandomArrFromArr = function (arr, newLength) {
  var newArr = [];
  var workArr = arr.slice();
  newArr.length = newLength;
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = (workArr[getRandomNumber(0, workArr.length - 1)]);
    workArr.splice(workArr.indexOf(newArr[i], 0), 1);
  }
  return (newArr);
};

/**
 * Формирует карточку с предложением о сдаче жилья
 * @param {number} number -количество необходимых изображений - аватаров
 * @return {apartmentOffer}-объект, карточка с предложением
 */
var getApartmentOffer = function (number) {

  var xNumber = (getRandomNumber(Coordinates.X_MIN_VALUE, Coordinates.X_MAX_VALUE));
  var yNumber = (getRandomNumber(Coordinates.Y_MIN_VALUE, Coordinates.Y_MAX_VALUE));

  var apartmentOffer = {
    author: {
      avatar: 'img/avatars/user' + '0' + number + '.png',
    },
    offer: {
      title: 'Уютное гнездышко для молодоженов',
      location: {
        x: xNumber,
        y: yNumber,
      },
      address: '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
      price: (getRandomNumber(Prices.MIN_PRICE, Prices.MAX_PRICE)),
      type: APARTMENT_TYPES[getRandomNumber(0, 3)],
      rooms: (getRandomNumber(2, 4)),
      guests: (getRandomNumber(2, 4)),
      checkin: CHECK_IN_OUT_TIMES[getRandomNumber(0, 2)],
      checkout: CHECK_IN_OUT_TIMES[getRandomNumber(0, 2)],
      features: getRandomArrFromArr(APARTMENT_EXAMPLE_FEATURES, getRandomNumber(1, 6)),
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована',
      photos: getRandomArrFromArr(PHOTO_EXAMPLES, getRandomNumber(1, 3)),
    }
  };

  return apartmentOffer;
};
/**
 * Формирует массив карточек с предложениями
 * @param {number} objectsQuantity -необходимое  количество  карточек об аренде (т.е.длина массива)
 * @return {apartmentOffers} - массив карточек с предложениями
 */
var getApartmentOffers = function (objectsQuantity) {
  var apartmentOffers = [];
  for (var i = 0; i < objectsQuantity; i++) {

    apartmentOffers.push(getApartmentOffer(i + 1));
  }
  return apartmentOffers;
};

var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
getApartmentOffer();
var apartmentOffers = getApartmentOffers(OBJECTS_QUANTITY);


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
  cardElement.querySelector('.popup__type').textContent = APARTMENT_TYPES_RUSSIAN[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнат(ы) для' + ' ' + card.offer.guests + ' ' + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + card.offer.checkout;
  getFeaturesinElement(APARTMENT_EXAMPLE_FEATURES);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  getPhotosInElement(PHOTO_EXAMPLES);
  return cardElement;
};
// Временная функция
var renderCardElements = function (offers) {
  var pinElements = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  offers.forEach(function (offer) {
    fragment.appendChild(renderCard(offer));
  });
  pinElements.appendChild(fragment);
};

var pinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/**
 * Создает метку на карту для предложения о сдаче жилья
 * @param {object} card - сформированная карточка с предложением
 * @return {pinElement} - готовая метка
 */
var renderPin = function (card) {
  var pinElement = pinElementTemplate.cloneNode(true);
  pinElement.style.left = card.offer.location.x - Coordinates.X_OFFSET + 'px';
  pinElement.style.top = card.offer.location.y - Coordinates.Y_OFFSET + 'px';
  pinElement.querySelector('img').setAttribute('src', card.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', card.offer.title);

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


var enableForm = function (enable) {
  var formElement = document.querySelector('.ad-form');
  if (enable) {
    document.querySelectorAll('.ad-form__element').forEach(function (item) {
      item.removeAttribute('disabled');
      formElement.classList.remove('ad-form--disabled');
      formElement.querySelector('#address').setAttribute('value', Math.floor(MainPinValues.WIDTH + MainPinValues.X_OFFSET) + ',' +
        Math.floor(MainPinValues.HEIGHT + MainPinValues.Y_OFFSET));
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
var mainPin = document.querySelector('.map__pin--main');
var enablePage = function (enable) {
  var map = document.querySelector('.map');
  if (enable) {
    document.querySelector('.map__filters').classList.remove('map__filters--disabled');
    enableForm(true);
    map.classList.remove('map--faded');
    renderPinElements(apartmentOffers);
    renderCardElements(apartmentOffers);
  } else {
    enableForm();
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
document.querySelector('#room_number').addEventListener('change', roomGuestChangeHandler);
document.querySelector('#capacity').addEventListener('change', roomGuestChangeHandler);
