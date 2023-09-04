import {
  isEscape,
  isEnter
} from './utils.js'; // Один параметр с кодом клавиши из свойтсва объекта Event.key

const modal = document.querySelector('.img-upload__overlay');
const closeButton = modal.querySelector('#upload-cancel');

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

function openModal() {
  modal.classList.remove('hidden');
  document.
    addEventListener('keydown', onPopUpEscDown);
  closeButton.
    addEventListener('click', onCloseButtonClick);
  closeButton.
    addEventListener('keydown', onCloseButtonEnterDown);
}

function closeModal() {
  modal.classList.add('hidden');
  document.
    removeEventListener('keydown', onPopUpEscDown);
  closeButton.
    removeEventListener('click', onCloseButtonClick);
  closeButton.
    removeEventListener('keydown', onCloseButtonEnterDown);
}

document.
  querySelector('#upload-file').
  addEventListener('click', onUploadFileClick);
