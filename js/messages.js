/**
 * Формирование окон с собщениеми
 */

const readDataFail = (err) => {
  const templateReadErrorItem = document.querySelector('#reading-error').content.querySelector('.reading-error'); // считываем из шаблона структуру DOM контейнера
  const elementMain = document.querySelector('main');
  const newError = templateReadErrorItem.cloneNode(true);
  newError.textContent = err;
  document.body.insertBefore(newError, elementMain);
};

const sendDataMessage = (status, message) => {
  let newMessage;

  if (!status && message === 'validator') {
    const templateErrorItem = document.querySelector('#reading-error').content.querySelector('.reading-error'); // считываем из шаблона структуру DOM контейнера
    const errorWrapper = document.querySelector('.img-upload__text');
    const newError = templateErrorItem.cloneNode(true);
    newError.textContent = 'Не заполнены поля!';
    errorWrapper.append(newError);

    setTimeout(() => {
      newError.remove();
    }, 2000);
    return;
  }

  if (status) {
    const templateSuccess = document.querySelector('#success').content.querySelector('.success'); // считываем из шаблона структуру DOM контейнера
    newMessage = templateSuccess.cloneNode(true);
    const successButton = newMessage.querySelector('.success__button');

    successButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onPopUpEscDown); //Добавляем на страницу обработчик нажатия клавиши Esc по которому будет закрываться модальное окно
    newMessage.addEventListener('click', onModalClick); //Добавляем обработчик закрытия окна по клику за пределами окна с сообщением

    newMessage.querySelector('.success__title').textContent = message;
    document.body.append(newMessage);

  } else {
    const templateError = document.querySelector('#error').content.querySelector('.error'); // считываем из шаблона структуру DOM контейнера
    newMessage = templateError.cloneNode(true);

    const errorButton = newMessage.querySelector('.error__button');

    errorButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onPopUpEscDown); //Добавляем на страницу обработчик нажатия клавиши Esc по которому будет закрываться модальное окно
    newMessage.addEventListener('click', onModalClick); //Добавляем обработчик закрытия окна по клику за пределами окна с сообщением

    newMessage.querySelector('.error__title').textContent = 'Ошибка загрузки файла';
    document.body.append(newMessage);
  }

  function onButtonClick(evt) {
    evt.preventDefault();
    if (newMessage !== null) {
      newMessage.remove();
    }
  }

  function onPopUpEscDown(evt) {
    if (newMessage !== null && evt.key === 'Escape') {
      newMessage.remove();
    }
  }

  function onModalClick(evt) {
    if (evt.target !== newMessage.querySelector('div') && newMessage !== null) {
      newMessage.remove();
    }
  }

};

export {
  readDataFail,
  sendDataMessage
};
