'use strict';
(function () {

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
  window.util = {
    getRandomArrFromArr: getRandomArrFromArr,
    getRandomNumber: getRandomNumber,
  };
})();
