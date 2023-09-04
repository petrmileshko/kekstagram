// Получение случайного числа из диапазона между min и max включительно
function getRandomNumber(min, max) {

  if (min === max) {
    return min;
  }
  const from = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const till = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (till - from + 1)) + from;
}

// Проверка длины введенной строки на соблюдение условия не более max
function validateTextLength(text, max) {
  if (text === '' || text === null || text === undefined || max < 1 || typeof (text) !== 'string') {
    return false;
  }
  return text.length <= max;
}

function getRandomElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function isEscape(key) {
  return key === 'Escape';
}

function isEnter(key) {
  return key === 'Enter';
}

export {
  getRandomNumber,
  validateTextLength,
  getRandomElement,
  isEscape,
  isEnter
};
