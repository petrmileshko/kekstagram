import {
  isEscape,
  isEnter
} from './utils.js'; // Один параметр с кодом клавиши из свойтсва объекта Event.key

const modal = document.querySelector('.big-picture');
const closeButton = modal.querySelector('#picture-cancel');


function closeModal() {
  modal.classList.add('hidden');
  modal.querySelector('.social__comment-count').classList.remove('hidden');
  document.body.classList.remove('modal-open');
  if (modal.classList.contains('hidden')) {
    removeHandlersClose();
  }
  modal.querySelector('.big-picture__img>img').src = '';
  modal.querySelector('.social__caption').textContent = '';
  modal.querySelector('.likes-count').textContent = '';
  modal.querySelector('.comments-count').textContent = '';
  modal.querySelector('.social__comments').innerHTML = '';
}

function showModal({
  url,
  description,
  likes,
  comments
}) {
  let commentHTML = '';
  modal.querySelector('.big-picture__img>img').src = url;
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.likes-count').textContent = likes;
  modal.querySelector('.comments-count').textContent = comments.length;
  comments.forEach(({
    avatar,
    message,
    name
  }) => {
    const html = `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
</li>`;
    commentHTML = commentHTML + html;
  });
  modal.querySelector('.social__comments').innerHTML = (commentHTML !== '') ? commentHTML : '';
  modal.classList.remove('hidden');
  modal.querySelector('.social__comment-count').classList.add('hidden');
  document.body.classList.add('modal-open');
  if (!modal.classList.contains('hidden')) {
    addHandlersClose();
  }
}

function addHandlerOpen(picture, element) {
  picture.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(element);
  });
}

function addHandlersClose() {
  closeButton.addEventListener('click', onCloseButtonClick);
  closeButton.addEventListener('keydown', onCloseButtonEnterDown);
  document.addEventListener('keydown', onPopUpEscDown);
}

function removeHandlersClose() {
  closeButton.removeEventListener('click', onCloseButtonClick);
  closeButton.removeEventListener('keydown', onCloseButtonEnterDown);
  document.removeEventListener('keydown', onPopUpEscDown);
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

const openPicture = ({
  links,
  elements
}) => {
  links.forEach((picture, index) => {
    addHandlerOpen(picture, elements[index]);
  });
  return true;
};

export {
  openPicture
};
