function addSubmitHandler(form, validator) {

  form.addEventListener('submit', (evt) => {
    const isValid = validator.validate();
    if (isValid) {
      console.log('Данные введены правильно');
    } else {
      console.log('Ошибка в данных');
      evt.preventDefault();
    }
  });
}

function userForm(form, args, onInput = true) {
  const validator = new Pristine(form, args, onInput);

  return function () {
    addSubmitHandler(form, validator);
    return validator;
  };
}

export {
  userForm
};
