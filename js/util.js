'use strict';

(function () {
  var ESCAPE = 'Escape';
  var lastTimeout;

  /**
 * Передает вызов функции не более одного раза за указанное время, для устранения "дребезга"
 * @param {function} targetFunction - функция которая передается
 * @param {number} time - указанное время в м/с
 */
  var debounce = function (targetFunction, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    window.util.lastTimeout = window.setTimeout(targetFunction, time);
  };

  window.util = {
    ESCAPE: ESCAPE,
    lastTimeout: lastTimeout,
    debounce: debounce,
  };
})();
