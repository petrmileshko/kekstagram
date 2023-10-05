/**
 * Масштабирование фото
 */

const DEFAULT = 100;
const STEP = 25;
const MIN = 25;
const MAX = 75;

function scalePicture({
  decreaseButton,
  increaseButton,
  output,
  image
}) {
  imageScale();

  return {
    init: function () {
      decreaseButton.addEventListener('click', onDecreaseClick);
      increaseButton.addEventListener('click', onIncreaseClick);
    },
    reset: function () {
      decreaseButton.removeEventListener('click', onDecreaseClick);
      increaseButton.removeEventListener('click', onIncreaseClick);
      imageScale();
    }
  };

  function onIncreaseClick() {
    let newScale = parseInt(output.value, 10) + STEP;

    if (newScale > MAX) {
      newScale = DEFAULT;
    }

    imageScale(newScale);
  }

  function onDecreaseClick() {
    let newScale = parseInt(output.value, 10) - STEP;

    if (newScale < MIN) {
      newScale = MIN;
    }

    imageScale(newScale);
  }

  function imageScale(val = DEFAULT) {
    image.style.transform = `scale(${val / 100})`;
    output.value = `${val}%`;
  }
}

export {
  scalePicture
};
