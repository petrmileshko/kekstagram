import {
  isEscape,
  isEnter
} from './utils.js'; // Один параметр с кодом клавиши из свойства объекта Event.key

const modal = document.querySelector('.img-upload__overlay');
const closeButton = modal.querySelector('#upload-cancel');
const uploadElement = document.querySelector('#upload-file');
const hashtags = document.querySelector('[name="hashtags"]');
const description = document.querySelector('[name="description"]');

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
  if (isEscape(e.key)) {
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

function onHashtagsEscDown(e) {
  if (isEscape(e.key)) {
    e.stopPropagation();
  }
}

function onDescriptionEscDown(e) {
  if (isEscape(e.key)) {
    e.stopPropagation();
  }
}

//Функция для открытия модального окна
function openModal() {
  modal.classList.remove('hidden');                            //Показываем модальное окно с формой
  document.body.classList.add('modal-open');                   //Убираем прокрутку основного экрана
  document.
    addEventListener('keydown', onPopUpEscDown);               //Добавляем на страницу обработчик нажатия клавиши Esc по которому будет закрываться модальное окно
  closeButton.
    addEventListener('click', onCloseButtonClick);             //Добавляем на кнопку с крестиком обработчик клика мышки, для закрытия модального окна с формой
  closeButton.
    addEventListener('keydown', onCloseButtonEnterDown);       //Добавляем на кнопку с крестиком обработчик нажатия клавиши Enter, для закрытия модального окна с формой
  hashtags.
    addEventListener('keydown', onHashtagsEscDown);            //Отменяем на поле ввода хештегов, закрытие окна по нажатию клавиши Esc
  description.
    addEventListener('keydown', onDescriptionEscDown);         //Отменяем на поле ввода описания, закрытие окна по нажатию клавиши Esc
}

//Функция для закрытия модального окна
function closeModal() {
  modal.classList.add('hidden');                                 //Прячем модальное окно с формой
  uploadElement.value = '';                                      //Обнуляем поля формы
  hashtags.value = '';
  description.value = '';
  document.body.classList.remove('modal-open');                  //Восстанавливаем прокрутку основного экрана
  document.
    removeEventListener('keydown', onPopUpEscDown);              //Удаляем не нужные обработчики событий в модальном окне
  closeButton.
    removeEventListener('click', onCloseButtonClick);
  closeButton.
    removeEventListener('keydown', onCloseButtonEnterDown);
  hashtags.
    removeEventListener('keydown', onHashtagsEscDown);
  description.
    removeEventListener('keydown', onDescriptionEscDown);
}

uploadElement.addEventListener('change', onUploadFileClick);     //На поле загрузки файла вешаем обработчик события выбора файла
