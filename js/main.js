
// Получение случайного числа из диапазона между min и max включительно
function getRandomNumber(min, max) {

  if (min === max) {
    return min;
  }

  let from, till;

  if (min > max) {
    from = Math.floor(max);
    till = Math.ceil(min);
  } else {
    from = Math.ceil(min);
    till = Math.floor(max);
  }
  return Math.floor(Math.random() * (till - from + 1)) + from;
}

// Проверка длины введенной строки на соблюдение условия не более max
function validateTextLength(text, max) {
  if (text === '' || text === null || text === undefined || max < 1) {
    return false;
  }

  if (typeof (text) !== 'string') {
    return false;
  }

  return text.length <= max;
}

getRandomNumber(20, 55);

validateTextLength('Текст на провреку меньше 50', 50);
