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


export {
  readDataFail
};
