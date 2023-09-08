import {
  isEscape,
  isEnter,
  isHashTags,
  hasUniqueTags,
  isFirstSymbol,
  isLengthLess,
  isLengthMore,
  isElemetsFocused
} from './utils.js'; // Один параметр с кодом клавиши из свойства объекта Event.key

import {
  userForm
} from './user-form.js'; // Один параметр - ссылка на форму

const modal = document.querySelector('.img-upload__overlay');
const closeButton = modal.querySelector('#upload-cancel');
const uploadElement = document.querySelector('#upload-file');
const hashtags = document.querySelector('[name="hashtags"]');
const description = document.querySelector('[name="description"]');
const form = document.querySelector('#upload-select-image');

/**
 * Подключаем валидацию формы
 */
const MIN_HASH_LENGTH = 2;
const MAX_HASH_LENGTH = 20;
const MAX_HASHTAGS = 5;

const initValidation = userForm(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__text--error'
});

const validator = initValidation();

/**
  добавляем callback функции для обработчиков
 */
function onUploadFileClick(e) {
  e.preventDefault();
  openModal();
}

function onCloseButtonClick(e) {
  e.preventDefault();
  closeModal();
}

function onPopUpEscDown(e) {
  if (isEscape(e.key) && !isElemetsFocused([hashtags, description])) {
    e.preventDefault();
    closeModal();
  }
}

function onCloseButtonEnterDown(e) {
  if (isEnter(e.key)) {
    e.preventDefault();
    closeModal();
  }
}

//Функция для открытия модального окна
function openModal() {
  modal.classList.remove('hidden'); //Показываем модальное окно с формой
  document.body.classList.add('modal-open'); //Убираем прокрутку основного экрана
  document.addEventListener('keydown', onPopUpEscDown); //Добавляем на страницу обработчик нажатия клавиши Esc по которому будет закрываться модальное окно
  closeButton.addEventListener('click', onCloseButtonClick); //Добавляем на кнопку с крестиком обработчик клика мышки, для закрытия модального окна с формой
  closeButton.addEventListener('keydown', onCloseButtonEnterDown); //Добавляем на кнопку с крестиком обработчик нажатия клавиши Enter, для закрытия модального окна с формой
}

//Функция для закрытия модального окна
function closeModal() {
  modal.classList.add('hidden'); //Прячем модальное окно с формой
  form.reset(); //Обнуляем поля формы
  validator.reset(); //Обнуляем валидацию
  document.body.classList.remove('modal-open'); //Восстанавливаем прокрутку основного экрана
  document.removeEventListener('keydown', onPopUpEscDown); //Удаляем не нужные обработчики событий в модальном окне
  closeButton.removeEventListener('click', onCloseButtonClick);
  closeButton.removeEventListener('keydown', onCloseButtonEnterDown);
}

//Валидация хэштегов
let errorMessage = '';

function validateHachTags(value) {
  const tags = value.trim().split(' ');

  if (!isFirstSymbol(tags, '#')) {
    errorMessage = 'Должен начинаться на #!';
    return false;
  }

  if (!isLengthLess(tags, MIN_HASH_LENGTH)) {
    errorMessage = `Не менее ${MIN_HASH_LENGTH} символов включая #!`;
    return false;
  }

  if (isLengthMore(tags, MAX_HASH_LENGTH)) {
    errorMessage = `Не более ${MAX_HASH_LENGTH} символов включая #!`;
    return false;
  }

  if (!hasUniqueTags(tags)) {
    errorMessage = 'Не должны повторяться!';
    return false;
  }

  if (!isHashTags(tags)) {
    errorMessage = 'Только буквы и цифры!';
    return false;
  }

  if (tags.length > MAX_HASHTAGS) {
    errorMessage = 'Разрешено не более 5 хэштегов!';
    return false;
  }
  return true;
}

function getErrorMesage() {
  return errorMessage;
}

validator.addValidator(hashtags, validateHachTags, getErrorMesage);

//Валидация описания
function validateDescription(value) {
  return value.length <= 140;
}

validator.addValidator(description, validateDescription, 'Длина описания не больше 140 символов');

//Открытие окна с формой загрузки по событию изменения в поле ввода для выбора файла
uploadElement.addEventListener('change', onUploadFileClick); //На поле загрузки файла вешаем обработчик события выбора файла
