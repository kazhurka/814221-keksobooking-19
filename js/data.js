'use strict';
(function () {
  var APARTMENT_RUSSIAN_TYPES = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
  };
  var Filtersprices = {
    'LOW': function (it) {
      return it.offer.price < 10000;
    },
    'MIDDLE': function (it) {
      return it.offer.price > 10000 && it.offer.price < 50000;
    },
    'HIGH': function (it) {
      return it.offer.price > 50000;
    },
    'ANY': function () {
      return true;
    }
  };
  var Filterguests = {
    '1': function (it) {
      return it.offer.rooms >= 1;
    },
    '2': function (it) {
      return it.offer.rooms >= 2;
    },
    '0': function (it) {
      return it.offer.rooms >= 0;
    },
    'ANY': function () {
      return true;
    },
  };
  var Filterrooms = {
    '1': function (it) {
      return it.offer.rooms === 1;
    },
    '2': function (it) {
      return it.offer.rooms === 2;
    },
    '3': function (it) {
      return it.offer.rooms === 3;
    },
    'ANY': function () {
      return true;
    }
  };
  var Filterfeatures = {
    'WIFI': function (it) {
      return it.offer.features.includes('wifi');
    },
    'DISHWASHER': function (it) {
      return it.offer.features.includes('dishwasher');
    },
    'PARKING': function (it) {
      return it.offer.features.includes('parking');
    },
    'WASHER': function (it) {
      return it.offer.features.includes('washer');
    },
    'ELEVATOR': function (it) {
      return it.offer.features.includes('elevator');
    },
    'CONDITIONER': function (it) {
      return it.offer.features.includes('conditioner');
    },
  };
  var OBJECTS_QUANTITY = 8;
  var offers;
  /**
   * Обрабочик успешной загрузки данных
   * @param {data} offersData - полученные с сервера данные
   */
  var dataSuccessHandler = function (offersData) {
    offers = offersData;
    document.querySelector('.map__filters').addEventListener('change', offersUpdate);
    document.querySelectorAll('.map__checkbox').forEach(function (checkbox) {
      checkbox.addEventListener('click', offersUpdate);
    });
  };

  /**
   * Обработчик ошибки при загрузке данных
   * @param {string} errorMessage - сообщение об ошибке
   */
  var dataErrorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; font-size: 10;margin: 0 auto; text-align: center; background-color:rgba(255, 86, 53, 0.9);color: #fff; width: 41%;font-family: "Roboto", "Arial", sans-serif ;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.top = '100px';
    message.style.fontSize = '34px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.server.load(dataSuccessHandler, dataErrorHandler);
  /**
   * Получает значение выбранного поля
   * @param {string} select имя выбранного фильтра
   * @return {string} filterValue - значение выбранного поля.
   */
  var getFilterValue = function (select) {
    var filterValue = document.querySelector('#housing-' + select).value;
    return filterValue;

  };

  var filteredOffers;
  /**
   * Создет новый массив с предложениями  на базе данного, согласно выбранному "типу жилья".
   * @return {array} - новый  массив
   */
  var filterOffersType = function () {
    if (getFilterValue('type') === 'any') {
      filteredOffers = offers;
    } else {
      filteredOffers = offers.filter(function (it) {
        return it.offer.type === getFilterValue('type');
      });
    }
    return filteredOffers;
  };

  /**
   * Создает новый массив с предложениями на базе данного, согласно выбранной "цене"
   * @return {array} - новый  массив
   */
  var filterOffersPrice = function () {
    var priceValue = getFilterValue('price').toUpperCase();
    filteredOffers = filteredOffers.filter(Filtersprices[priceValue]);
    return filteredOffers;
  };

  var filterOffersGuests = function () {
    var guestsValue = getFilterValue('guests').toUpperCase();
    filteredOffers = filteredOffers.filter(Filterguests[guestsValue]);
    return filteredOffers;
  };

  var filterOffersRooms = function () {
    var roomsValue = getFilterValue('rooms').toUpperCase();
    filteredOffers = filteredOffers.filter(Filterrooms[roomsValue]);
    return filteredOffers;
  };


  var getAllPressedFeatures = function () {
    var pressedFeatures = [];
    document.querySelectorAll('.map__checkbox').forEach(function (feature) {
      if (feature.checked) {
        pressedFeatures.push(feature.value.toUpperCase());
      }
    });
    return pressedFeatures;

  };
  var filterOfferFeatures = function () {
    var pressedFeatures = getAllPressedFeatures();
    pressedFeatures.forEach(function (it) {
      filteredOffers = filteredOffers.filter(Filterfeatures[it]);
    });
    return filteredOffers;
  };
  var lastTimeout;
  var offersUpdate = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pin.remove();
      window.card.remove();
      filterOffersType();
      filterOffersPrice();
      filterOffersRooms();
      filterOffersGuests();
      filterOfferFeatures();
      if (filteredOffers.length > 5) {
        filteredOffers = filteredOffers.slice(0, 5);
      }
      window.pin.renderElements(filteredOffers);
      window.data.filteredOffers = filteredOffers;
    }, 500);
  };

  window.data = {
    OBJECTS_QUANTITY: OBJECTS_QUANTITY,
    APARTMENT_RUSSIAN_TYPES: APARTMENT_RUSSIAN_TYPES,
    filteredOffers: filteredOffers,
    offersUpdate: offersUpdate,
  };

})();
