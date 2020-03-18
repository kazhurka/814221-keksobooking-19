'use strict';
(function () {
  var APARTMENT_RUSSIAN_TYPES = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
  };

  var TIME_IN_MS = 500;
  var PINS_QUANTITY = 5;
  var FiltersPrices = {
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
  var typeValue;
  var priceValue;
  var guestsValue;
  var roomsValue;

  var mapCheckbox = document.querySelectorAll('.map__checkbox');
  var filters = document.querySelector('.map__filters');
  var offers;
  var loaded = false;
  /**
   * Обрабочик успешной загрузки данных
   * @param {data} offersData - полученные с сервера данные
   */
  var dataSuccessHandler = function (offersData) {
    offers = offersData;
    filters.addEventListener('change', offersUpdate);
    mapCheckbox.forEach(function (checkbox) {
      checkbox.addEventListener('click', offersUpdate);
      window.data.offersUpdate();
      window.data.loaded = true;
    });
  };

  /**
   * Обработчик ошибки при загрузке данных
   * @param {string} errorText - сообщение об ошибке
   */
  var dataErrorHandler = function (errorText) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; font-size: 10;margin: 0 auto; text-align: center; background-color:rgba(255, 86, 53, 0.9);color: #fff; width: 41%;font-family: "Roboto", "Arial", sans-serif ;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.top = '100px';
    message.style.fontSize = '34px';
    message.textContent = errorText;
    document.body.insertAdjacentElement('afterbegin', message);
  };
  /**
 * Фильтрует массив предложений полученных с сервера.
 * @return {array} - массив с  данными(которые подходят под выбранные фильтры).
 */
  var filterOffers = function () {
    var i = 0;
    filteredOffers = [];
    while ((filteredOffers.length < PINS_QUANTITY) && (i < offers.length)) {
      if (filterItems(offers[i])) {
        filteredOffers.push(offers[i]);
      }
      i++;
    }
    return filteredOffers;
  };

  /**
   * Определяет подходит ли заданный объект под параметры выбранных фильтров.
   * @param {object} it -  объект с предложением о сдачи жилья
   * @return {bullean}
   */
  var filterItems = function (it) {
    var gotAllFeatures = true;
    document.querySelectorAll('.map__checkbox:checked').forEach(function (feature) {
      gotAllFeatures = gotAllFeatures && it.offer.features.includes(feature.value);
    });

    return ((typeValue === 'any' ? true : it.offer.type === typeValue) &&
      FiltersPrices[priceValue](it) &&
      (roomsValue === 'any' ? true : it.offer.rooms === roomsValue) &&
      (guestsValue === 'any' ? true : it.offer.guests === guestsValue) &&
      gotAllFeatures);
  };


  /**
   * Обновляет  метки на карте согласно примененным фильтрам.
   */
  var offersUpdate = function () {
    var update = function () {
      typeValue = getFilterValue('type');
      priceValue = getFilterValue('price').toUpperCase();
      guestsValue = getFilterValue('guests');
      roomsValue = getFilterValue('rooms');
      window.pin.remove();
      window.card.remove();
      filterOffers();
      window.pin.renderElements(filteredOffers);
      window.data.filteredOffers = filteredOffers;
    };
    window.util.debounce(update, TIME_IN_MS);
  };


  window.data = {
    APARTMENT_RUSSIAN_TYPES: APARTMENT_RUSSIAN_TYPES,
    filteredOffers: filteredOffers,
    offersUpdate: offersUpdate,
    successHandler: dataSuccessHandler,
    errorHandler: dataErrorHandler,
    loaded: loaded,
  };

})();
