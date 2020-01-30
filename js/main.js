'use strict';
var CONTAINER_WIDTH = 1200;
var APARTMENT_TYPES = ['palace',
  'flat',
  'house',
  'bungalo'
];
var CHECK_IN_OUT_TIMES = ['12:00',
  '13:00',
  '14:00'
];
var APARTMENT_EXAMPLE_FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTO_EXAMPLES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var OBJECTS_QUANTITY = 8;
var MIN_PRICE = 500;
var MAX_PRICE = 1000;
var Y_MIN_VALUE = 130;
var Y_MAX_VALUE = 630;
var X_MIN_VALUE = 0;
var getRandomNumber = function (min, max) {

  return Math.floor(Math.random() * (max - min) + min);

};

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

var getApartmentOffer = function (number) {

  var xNumber = (getRandomNumber(X_MIN_VALUE, CONTAINER_WIDTH));
  var yNumber = (getRandomNumber(Y_MIN_VALUE, Y_MAX_VALUE));

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
      price: (getRandomNumber(MIN_PRICE, MAX_PRICE)),
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

var getApartmentOffers = function (objectsQuantity) {
  var apartmentOffers = [];
  for (var i = 0; i < objectsQuantity; i++) {

    apartmentOffers.push(getApartmentOffer(i + 1));
  }
  return apartmentOffers;
};
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
getApartmentOffer();
var apartmentOffers = getApartmentOffers(OBJECTS_QUANTITY);

var renderCard = function (card) {
  var cardElement = cardOfferTemplate.cloneNode(true);
  var getFeaturesinElement = function (features) {
    features.forEach(function (item) {
      if (card.offer.features.indexOf(item, 0) === -1) {
        cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature--' + item));
      }
    });
  };
  var cardPhotosTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
  var cardImgTemplate = cardPhotosTemplate.querySelector('img');
  var getPhotosInElement = function (photos) {
    photos.forEach(function (item) {
      var imgOfElement = cardImgTemplate.cloneNode(true);
      imgOfElement.setAttribute('src', item);
      cardElement.querySelector('.popup__photos').appendChild(imgOfElement);
    });
  };
  cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнат(ы) для' + ' ' + card.offer.guests + ' ' + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + card.offer.checkout;
  getFeaturesinElement(APARTMENT_EXAMPLE_FEATURES);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos').querySelector('img'));
  getPhotosInElement(PHOTO_EXAMPLES);
  return cardElement;
};

var pinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderPin = function (card) {
  var pinElement = pinElementTemplate.cloneNode(true);
  var pinLeft = card.offer.location.x - 25 + 'px';
  var pinTop = card.offer.location.y - 70 + 'px';
  pinElement.style = {};
  pinElement.style.left = pinLeft;
  pinElement.style.top = pinTop;
  pinElement.querySelector('img').setAttribute('src', card.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', card.offer.title);

  return pinElement;
};
var pinElements = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i < OBJECTS_QUANTITY; i++) {
  fragment.appendChild(renderPin(apartmentOffers[i]));
  fragment.appendChild(renderCard(apartmentOffers[i]));
}
pinElements.appendChild(fragment);
