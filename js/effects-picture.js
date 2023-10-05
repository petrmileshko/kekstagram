/**
 * Наложение эффектов на image
 */

const EFFECTS = [{
  min: 1,
  name: 'none',
  step: 1,
  max: 100,
},
{
  name: 'chrome',
  min: 0,
  max: 1,
  style: 'grayscale',
  step: 0.1,
  unit: ''
},
{
  name: 'sepia',
  min: 0,
  max: 1,
  style: 'sepia',
  step: 0.1,
  unit: ''
},
{
  name: 'marvin',
  min: 0,
  max: 100,
  style: 'invert',
  step: 1,
  unit: '%'
},
{
  name: 'phobos',
  min: 0,
  max: 3,
  style: 'blur',
  step: 0.1,
  unit: 'px'
},
{
  name: 'heat',
  min: 1,
  max: 3,
  style: 'brightness',
  step: 0.1,
  unit: ''
}
];

function effectsPicture({
  container,
  slider,
  output,
  image
}) {
  let effectSelected = EFFECTS[0];

  return {
    init: function () {
      noUiSlider.create(
        slider, {
          range: {
            min: EFFECTS[0].min,
            max: EFFECTS[0].max
          },
          start: EFFECTS[0].max,
          step: EFFECTS[0].step,
          connect: 'lower'
        }
      );
      container.addEventListener('change', onChangeEffect);
      slider.noUiSlider.on('update', onSliderUpdate);
    },
    reset: function () {
      container.removeEventListener('click', onChangeEffect);
      effectSelected = EFFECTS[0];
      slider.noUiSlider.destroy();
    }
  };

  function onChangeEffect(evt) {
    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }
    effectSelected = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateSlider();
  }

  function updateSlider() {
    slider.classList.remove('hidden');
    slider.noUiSlider.updateOptions({
      range: {
        min: effectSelected.min,
        max: effectSelected.max
      },
      start: effectSelected.max,
      step: effectSelected.step
    });

    if (effectSelected === EFFECTS[0]) {
      slider.classList.add('hidden');
    }
  }

  function onSliderUpdate() {
    output.value = '';
    image.className = '';
    image.style.filter = 'none';

    if (effectSelected === EFFECTS[0]) {
      return;
    }

    const sliderValue = slider.noUiSlider.get();
    image.style.filter = `${effectSelected.style}(${sliderValue}${effectSelected.unit})`;
    image.classList.add = `effects__preview--${effectSelected.name}`;
    output.value = sliderValue;
  }
}

export {
  effectsPicture
};
