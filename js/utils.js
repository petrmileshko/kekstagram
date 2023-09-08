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

//Получить случайный элемент из массива
function getRandomElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

//Проверка кода клавиши escape
function isEscape(key) {
  return key === 'Escape';
}

//Проверка кода клавиши enter
function isEnter(key) {
  return key === 'Enter';
}

//Проверка массива с хештегами на соответсвие используемых символов
function isHashTags(tagsArray) {
  const re = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
  return !tagsArray.some((tag)=>re.test(tag.slice(1)));
}

//Проверка массива с хештегами на уникальность
function hasUniqueTags(tags) {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

//Проверка хештега на наличие символа # в начале
function isFirstSymbol(tags, symbol) {
  return tags.every((tag) => String(tag)[0] === symbol);
}

//Проверка хештега на минимальную длину
function isLengthLess(tags, length) {
  return tags.every((tag) => tag.length >= length);
}

//Проверка хештега на максимальную длину
function isLengthMore(tags, length) {
  return tags.some((tag) => tag.length > length);
}

//Проверка элементов формы на состояние в фокусе
function isElemetsFocused(elements) {
  return elements.some((element) => element === document.activeElement);
}


export {
  getRandomNumber,
  validateTextLength,
  getRandomElement,
  isEscape,
  isEnter,
  isHashTags,
  hasUniqueTags,
  isFirstSymbol,
  isLengthLess,
  isLengthMore,
  isElemetsFocused
};
