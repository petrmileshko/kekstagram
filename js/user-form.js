/**
 * Подключение Pristine и обработка отправки данных
 */
function addSubmitHandler(form, cb, validator) {

  form.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid && cb !== null) {

      await cb(new FormData(form));

    } else {
      console.log('Ошибка отправки данных');
    }
  });
}

function userForm(form, args, onInput = true) {
  const validator = new Pristine(form, args, onInput);

  return function (cb = null) {
    addSubmitHandler(form, cb, validator);
    return validator;
  };
}

// Интерфейс для отправки данных и получения ссылки на валидатор Pristine
export {
  userForm
};
