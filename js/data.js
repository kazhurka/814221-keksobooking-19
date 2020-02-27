'use strict';
(function () {
  var APARTMENT_TYPES_RUSSIAN = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало',
  };
  var OBJECTS_QUANTITY = 8;
  var offers;
  /**
   * Обрабочик успешной загрузки данных
   * @param {data} offersData - полученные с сервера данные
   */
  var dataSuccessHandler = function (offersData) {
    offers = offersData;
    document.querySelector('#housing-type').addEventListener('change', offersUpdate);
    document.querySelector('#housing-price').addEventListener('change', offersUpdate);
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

  window.load(dataSuccessHandler, dataErrorHandler);
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
    if (filteredOffers.length > 5) {
      filteredOffers = filteredOffers.slice(0, 5);
    }
    return filteredOffers;

  };
  /**
  * Создает новый массив с предложениями на базе данного, согласно выбранной "цене"
  * @return {array} - новый  массив
  */
  var filterOffersPrice = function () {
    var priceValue = getFilterValue('price');
    switch (priceValue) {
      case 'low':
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'middle':
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.price > 10000 && it.offer.price < 50000;
        });
        break;
      case 'high':
        filteredOffers = filteredOffers.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
      default:
        filteredOffers = filteredOffers;
    }
    return filteredOffers;
  };

  var offersUpdate = function () {
    window.pin.removePins();
    window.card.removeCard();
    filterOffersType();
    filterOffersPrice();
    window.pin.renderElements(filteredOffers);
    window.data.filteredOffers = filteredOffers;
  };

  window.data = {
    OBJECTS_QUANTITY: OBJECTS_QUANTITY,
    APARTMENT_TYPES_RUSSIAN: APARTMENT_TYPES_RUSSIAN,
    filteredOffers: filteredOffers,
    offersUpdate: offersUpdate,
  };

})();
