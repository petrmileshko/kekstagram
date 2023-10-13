/**
 * Обратботка и отправка данных из формы
 */

import {
  isEscape,
  isEnter,
  isHashTags,
  hasUniqueTags,
  isFirstSymbol,
  isLengthLess,
  isLengthMore,
  isElemetsFocused
} from './utils.js'; // Утилиты

import {
  userForm
} from './user-form.js'; // Первый аргумент - форма, второй - параметры для валидатора / вернет функцию для инициализации обработчика формы и валидатора

import {
  scalePicture
} from './scale-picture.js'; // масштабирование

import {
  effectsPicture
} from './effects-picture.js'; // наложение эффектов

const modal = document.querySelector('.img-upload__overlay');
const closeButton = modal.querySelector('#upload-cancel');
const uploadElement = document.querySelector('#upload-file');
const hashtags = document.querySelector('[name="hashtags"]');
const description = document.querySelector('[name="description"]');
const form = document.querySelector('#upload-select-image');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const outputScale = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');
const sliderEffect = document.querySelector('.effect-level__slider');
const outputEffect = document.querySelector('.effect-level__value');

const MIN_HASH_LENGTH = 2;
const MAX_HASH_LENGTH = 20;
const MAX_HASHTAGS = 5;

const uploadPicture = (cb, showMessage) => {

  uploadElement.addEventListener('change', onUploadFileClick); //На поле загрузки файла вешаем обработчик события выбора файла

  // Инициализация валидатора и обработчика формы
  const validator = userForm(form, {
    classTo: 'img-upload__element',
    errorTextParent: 'img-upload__element',
    errorTextClass: 'img-upload__text--error'
  })(cb, onSubmitEvent);

  // Инициализация масштабирования
  const scaleUnit = scalePicture({
    decreaseButton: smallerScale,
    increaseButton: biggerScale,
    output: outputScale,
    image: picture
  });

  // Инициализация наложения эффектов
  const effectsUnit = effectsPicture({
    container: form,
    slider: sliderEffect,
    output: outputEffect,
    image: picture
  });

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

  //Функция для обработки результата событий отправки данных
  function onSubmitEvent(status, message) {
    if (status) {
      showMessage(true, message);
      closeModal();
    } else {
      if (message === 'validator') {
        showMessage(false, message);
      } else {
        showMessage(false, message);
        closeModal();
      }
    }
  }

  //Функция для открытия модального окна
  function openModal() {
    modal.classList.remove('hidden'); //Показываем модальное окно с формой
    document.body.classList.add('modal-open'); //Убираем прокрутку основного экрана
    document.addEventListener('keydown', onPopUpEscDown); //Добавляем на страницу обработчик нажатия клавиши Esc по которому будет закрываться модальное окно
    closeButton.addEventListener('click', onCloseButtonClick); //Добавляем на кнопку с крестиком обработчик клика мышки, для закрытия модального окна с формой
    closeButton.addEventListener('keydown', onCloseButtonEnterDown); //Добавляем на кнопку с крестиком обработчик нажатия клавиши Enter, для закрытия модального окна с формой
    scaleUnit.init(); //Инициализируем обработчики для масштабирования
    effectsUnit.init(); // Инициализация наложения эффектов
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
    scaleUnit.reset(); //Обнуляем масштабирование
    effectsUnit.reset(); // Обнуляем наложение эффектов
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
};

export {
  uploadPicture
};
