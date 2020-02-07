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
        id: number,
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
  var apartmentOffers = getApartmentOffers(OBJECTS_QUANTITY);
  window.data = {
    OBJECTS_QUANTITY: OBJECTS_QUANTITY,
    getApartmentOffer: getApartmentOffer,
    APARTMENT_TYPES_RUSSIAN: APARTMENT_TYPES_RUSSIAN,
    APARTMENT_EXAMPLE_FEATURES: APARTMENT_EXAMPLE_FEATURES,
    PHOTO_EXAMPLES: PHOTO_EXAMPLES,
    X_OFFSET: Coordinates.X_OFFSET,
    Y_OFFSET: Coordinates.Y_OFFSET,
    getApartmentOffers: getApartmentOffers,
    apartmentOffers: apartmentOffers,
  };

})();
