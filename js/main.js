function getRandom(min, max) {

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


function validateTextLength(text, max) {
  if (text === '' || text === null || text === undefined || max < 1) {
    return false;
  }

  if (typeof (text) !== 'string') {
    return false;
  }

  const length = text.length;

  if (length > max) {
    return false;
  }

  return true;
}

getRandom(20, 55);

validateTextLength("Текст на провреку меньше 50", 50);
