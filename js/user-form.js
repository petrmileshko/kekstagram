/**
 * Подключение Pristine и обработка отправки данных
 */
function addSubmitHandler(form, cb, onSubmitEvent, validator) {

  form.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid && cb !== null) {

      await cb(onSubmitEvent, new FormData(form));

    } else {
      onSubmitEvent(false, 'Ошибка отправки данных');
    }
  });
}

function userForm(form, args, onInput = true) {
  const validator = new Pristine(form, args, onInput);

  return function (cb = null, onSubmitEvent) {
    addSubmitHandler(form, cb, onSubmitEvent, validator);
    return validator;
  };
}

// Интерфейс для отправки данных и получения ссылки на валидатор Pristine
export {
  userForm
};
