'use strict';
(function () {

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

  var Coordinates = {
    Y_MIN_VALUE: 130,
    Y_MAX_VALUE: 630,
    X_MAX_VALUE: 1200,
    X_MIN_VALUE: 0,
    X_OFFSET: 25,
    Y_OFFSET: 70,
  };


  /**
   * Формирует карточку с предложением о сдаче жилья
   * @param {number} number -количество необходимых изображений - аватаров
   * @return {apartmentOffer}-объект, карточка с предложением
   */
  var getApartmentOffer = function (number) {

    var xNumber = (window.util.getRandomNumber(Coordinates.X_MIN_VALUE, Coordinates.X_MAX_VALUE));
    var yNumber = (window.util.getRandomNumber(Coordinates.Y_MIN_VALUE, Coordinates.Y_MAX_VALUE));

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
        price: (window.util.getRandomNumber(Prices.MIN_PRICE, Prices.MAX_PRICE)),
        type: APARTMENT_TYPES[window.util.getRandomNumber(0, 3)],
        rooms: (window.util.getRandomNumber(2, 4)),
        guests: (window.util.getRandomNumber(2, 4)),
        checkin: CHECK_IN_OUT_TIMES[window.util.getRandomNumber(0, 2)],
        checkout: CHECK_IN_OUT_TIMES[window.util.getRandomNumber(0, 2)],
        features: window.util.getRandomArrFromArr(APARTMENT_EXAMPLE_FEATURES, window.util.getRandomNumber(1, 6)),
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована',
        photos: window.util.getRandomArrFromArr(PHOTO_EXAMPLES, window.util.getRandomNumber(1, 3)),
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


  window.data = {
    OBJECTS_QUANTITY: OBJECTS_QUANTITY,
    /* Нужен， чтобы потом не использовать цифру 8 в качестве магического числа*/
    APARTMENT_TYPES_RUSSIAN: APARTMENT_TYPES_RUSSIAN,
    APARTMENT_EXAMPLE_FEATURES: APARTMENT_EXAMPLE_FEATURES,
    /* (нужны для отрисовки , сравниваю с ними значения из card )*/
    X_OFFSET: Coordinates.X_OFFSET,
    /* (нужны для адреса  и отрисовки пинов)*/
    Y_OFFSET: Coordinates.Y_OFFSET,
    /* (нужны для адреса и отрисовки пинов)*/
    getApartmentOffers: getApartmentOffers,
  };

})();
