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

function isHashTags(tagsArray) {
  //const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;/[^a-zA-Z0-9а-яА-ЯёЁ]/
  const re = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
  let isCorrect = true;
  tagsArray.forEach((tag) => {
    if (re.test(tag.slice(1))) {
      isCorrect = false;
    }
  });
  return isCorrect;
}

function hasUniqueTags(tags) {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

function isFirstSymbol(tags, symbol) {
  return tags.every((tag) => String(tag)[0] === symbol);
}

function isLengthLess(tags, length) {
  return tags.every((tag) => tag.length >= length);
}

function isLengthMore(tags, length) {
  return tags.some((tag) => tag.length > length);
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
  isLengthMore
};
