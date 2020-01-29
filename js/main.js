'use strict';
var getRandomNumber = function (min, max) {

  return Math.floor(Math.random() * (max - min) + min);

};
var containerWidth = 630;
var apartmentTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkInOutTimes = ['12:00', '13:00', '14:00'];
var apartmentExampleFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoExamples = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var getRandomArrFromArr = function (arr) {
  var newArr = [];
  var workArr = arr.slice();
  newArr.length = (getRandomNumber(1, workArr.length));
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = (workArr[getRandomNumber(0, workArr.length - 1)]);
    workArr.splice(workArr.indexOf(newArr[i], 0), 1);
  }
  return (newArr);
};


var getApartmentInfo = function () {
  var xNumber = (getRandomNumber(1, containerWidth));
  var yNumber = (getRandomNumber(130, 630));
  var apartmentInfo = {
    title: 'Заголовок предложения',
    location: {
      x: xNumber,
      y: yNumber,
    },
    address: 'адрес',
    price: (getRandomNumber(500, 1000)),
    type: apartmentTypes[getRandomNumber(0, 3)],
    rooms: (2),
    guests: (2),
    checkin: checkInOutTimes[getRandomNumber(0, 2)],
    checkout: checkInOutTimes[getRandomNumber(0, 2)],
    features: getRandomArrFromArr(apartmentExampleFeatures),
    description: 'строка с описанием',
    photos: getRandomArrFromArr(photoExamples),

  };
  return apartmentInfo;
};

var getRandomElementFromArr = function (arr) {
  var newEl = (arr[getRandomNumber(0, arr.length - 1)]);
  arr.splice(arr.indexOf(newEl, 0), 1);
  return (newEl);
};
var getRandomImgArr = function (adressImg, typeImg, numberImg) {

  var numberArr = [];
  var randomImgArr = [];
  for (i = 1; i <= numberImg; i++) {
    numberArr.push(i);
  }
  for (var i = 1; i <= numberImg; i++) {
    var randomImg = adressImg + 0 + getRandomElementFromArr(numberArr) + '.' + typeImg;
    randomImgArr.push(randomImg);
  }
  return randomImgArr;
};

var randomImgArr = getRandomImgArr('img/avatars/user', 'png', 8);

var getAuthorInfo = function () {
  var authorInfo = {
    avatar: getRandomElementFromArr(randomImgArr),
  };
  return authorInfo;
};
var getApartmentOffer = function () {
  var apartmentOffer = {};
  apartmentOffer.author = getAuthorInfo();
  apartmentOffer.offer = getApartmentInfo();
  return apartmentOffer;
};

// var getApartmentOffers = function () {
//   var apartmentOffers = [];
//   for (var i = 0; i < 8; i++) {

//     apartmentOffers.push(getApartmentOffer());
//   }
//   return apartmentOffers
// };
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
var apartmentOffer = getApartmentOffer();
var renderOffer = function () {
  var offerElement = cardOfferTemplate.cloneNode(true);
  var getFeatures = function () {
    if (apartmentOffer.offer.features.indexOf('wifi', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--wifi'));
    }
    if (apartmentOffer.offer.features.indexOf('dishwasher', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--dishwasher'));
    }
    if (apartmentOffer.offer.features.indexOf('parking', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--parking'));
    }
    if (apartmentOffer.offer.features.indexOf('washer', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--washer'));
    }
    if (apartmentOffer.offer.features.indexOf('elevator', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--elevator'));
    }
    if (apartmentOffer.offer.features.indexOf('conditioner', 0) === -1) {
      offerElement.querySelector('.popup__features').removeChild(offerElement.querySelector('.popup__feature--conditioner'));
    }

  };
  offerElement.querySelector('.popup__avatar').setAttribute('src', apartmentOffer.author.avatar);
  offerElement.querySelector('.popup__title').textContent = apartmentOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = apartmentOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = apartmentOffer.offer.price;
  offerElement.querySelector('.popup__type').textContent = apartmentOffer.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = apartmentOffer.offer.rooms + ' ' + 'комнат(ы) для' + ' ' + apartmentOffer.offer.guests + ' ' + 'гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + apartmentOffer.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + apartmentOffer.offer.checkout;
  getFeatures();
  offerElement.querySelector('.popup__description').textContent = apartmentOffer.offer.description;
  offerElement.querySelector('.popup__photos').querySelector('img').setAttribute('src', apartmentOffer.offer.photos[0]);
  var pinElement = document.querySelector('#pin').content;
  pinElement.appendChild(offerElement);
  var xNumber = (getRandomNumber(1, containerWidth));
  var yNumber = (getRandomNumber(130, 630));
  var pinLeft = xNumber + 'px';
  var pinTop = yNumber + 'px';
  pinElement.style = {};
  pinElement.style.left = pinLeft;
  pinElement.style.top = pinTop;
  return (pinElement);
};
var pinElements = document.querySelector('.map__pins');
// var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  pinElements.appendChild(renderOffer(apartmentOffer));
}


// pinElements.appendChild(fragment)
