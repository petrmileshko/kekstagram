function randomIterval(min, max) {

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


