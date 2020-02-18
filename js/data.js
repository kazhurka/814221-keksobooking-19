'use strict';
(function () {
  var APARTMENT_TYPES_RUSSIAN = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
  };
  var OBJECTS_QUANTITY = 8;
  var Coordinates = {
    X_OFFSET: 25,
    Y_OFFSET: 70,
  };
  var offers;

  window.load(function (offersData) {
    window.data.offers = offersData;
  });

  window.data = {
    OBJECTS_QUANTITY: OBJECTS_QUANTITY,
    /* Нужен， чтобы потом не использовать цифру 8 в качестве магического числа*/
    APARTMENT_TYPES_RUSSIAN: APARTMENT_TYPES_RUSSIAN,
    X_OFFSET: Coordinates.X_OFFSET,
    /* (нужны для адреса  и отрисовки пинов)*/
    Y_OFFSET: Coordinates.Y_OFFSET,
    /* (нужны для адреса и отрисовки пинов)*/
    offers: offers,

  };

})();
