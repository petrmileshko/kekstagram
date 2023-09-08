import {
  isEscape,
  isEnter
} from './utils.js'; // Один параметр с кодом клавиши из свойтсва объекта Event.key

const MAX_COMMENTS_PER_POST = 5;
let currentComments;
let currentCommentsCount = 0;
/**
 * Формирование окна для просмотра отдельного поста
 */
const modal = document.querySelector('.big-picture');
const closeButton = modal.querySelector('#picture-cancel');
const commentsContainer = modal.querySelector('.social__comments');
const showMore = modal.querySelector('.social__comments-loader');
const commentsTotal = modal.querySelector('.comments-count');

function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (modal.classList.contains('hidden')) {
    removeHandlersClose();
  }
  modal.querySelector('.big-picture__img>img').src = '';
  modal.querySelector('.social__caption').textContent = '';
  modal.querySelector('.likes-count').textContent = '';
  commentsTotal.textContent = '';
  commentsContainer.innerHTML = '';
  currentComments = null;
  currentCommentsCount = 0;
}

function showModal({
  url,
  description,
  likes,
  comments
}) {
  //вставляем данные из объекта в разметку окна
  modal.querySelector('.big-picture__img>img').src = url;
  modal.querySelector('.social__caption').textContent = description;
  modal.querySelector('.likes-count').textContent = likes;

  commentsContainer.innerHTML = getComments(comments, MAX_COMMENTS_PER_POST); // вставляем в разметку комментарии

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  if (!modal.classList.contains('hidden')) { // добавляем обработчики событий закрытия окна только после того как окно просмотра открыто
    addHandlersClose();
  }
}

// Функция для формирования разметки с комментариями и счетчика
function getComments(comments, counts) {

  if (comments.length > 0) {
    commentsTotal.textContent = comments.length;
    if (comments.length > counts) {
      modal.querySelector('.social__comment-count').innerHTML = `${counts} из <span class="comments-count">${comments.length}</span> комментариев`;
      showMore.classList.remove('hidden');
    } else {
      modal.querySelector('.social__comment-count').innerHTML = '<span class="comments-count"></span>';
      showMore.classList.add('hidden');
    }
  } else {
    modal.querySelector('.social__comment-count').innerHTML = 'Нет <span class="comments-count"></span> комментариев';
    showMore.classList.add('hidden');
  }
  // формируем комментарии к посту
  let commentHTML = '';
  if (comments.length <= counts) {
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
  } else {
    addHandlerShowModal();
    for (let i = 0; i < counts; i++) {
      const html = `
      <li class="social__comment">
      <img
          class="social__picture"
          src="${comments[i].avatar}"
          alt="${comments[i].name}"
          width="35" height="35">
      <p class="social__text">${comments[i].message}</p>
  </li>`;
      commentHTML = commentHTML + html;
    }
    currentComments = comments.slice(counts);
    currentCommentsCount += counts;
  }

  return commentHTML;
}

//Функция подгрузки комментариев
function showMoreComments() {
  if (currentComments.length <= MAX_COMMENTS_PER_POST) {
    let commentHTML = '';
    currentComments.forEach(({
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
    showMore.classList.add('hidden');
    showMore.removeEventListener('click', onCommentsLoader);
    commentsContainer.innerHTML = commentsContainer.innerHTML + commentHTML;
    modal.querySelector('.social__comment-count').innerHTML = `${commentsTotal.textContent} из <span class="comments-count">${commentsTotal.textContent}</span> комментариев`;
    currentCommentsCount = 0;
  } else {
    let commentHTML = '';
    for (let i = 0; i < MAX_COMMENTS_PER_POST; i++) {
      const html = `
      <li class="social__comment">
      <img
          class="social__picture"
          src="${currentComments[i].avatar}"
          alt="${currentComments[i].name}"
          width="35" height="35">
      <p class="social__text">${currentComments[i].message}</p>
  </li>`;
      commentHTML = commentHTML + html;
    }
    commentsContainer.innerHTML = commentsContainer.innerHTML + commentHTML;
    currentComments = currentComments.slice(MAX_COMMENTS_PER_POST);
    currentCommentsCount += MAX_COMMENTS_PER_POST;
    modal.querySelector('.social__comment-count').innerHTML = `${currentCommentsCount} из <span class="comments-count">${commentsTotal.textContent}</span> комментариев`;
  }
}

// Добавление обработчиков событий
function addHandlerOpen(picture, element) {
  picture.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(element);
  });
}

function addHandlerShowModal() {
  showMore.addEventListener('click', onCommentsLoader);
}

function addHandlersClose() {
  closeButton.addEventListener('click', onCloseButtonClick);
  closeButton.addEventListener('keydown', onCloseButtonEnterDown);
  document.addEventListener('keydown', onPopUpEscDown);
}

// Удаление обработчиков событий
function removeHandlersClose() {
  closeButton.removeEventListener('click', onCloseButtonClick);
  closeButton.removeEventListener('keydown', onCloseButtonEnterDown);
  if (!showMore.classList.contains('hidden')) {
    showMore.removeEventListener('click', onCommentsLoader);
  }
  document.removeEventListener('keydown', onPopUpEscDown);
}

// Callback функции событий
function onCommentsLoader(e) {
  e.preventDefault();
  showMoreComments();
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

// Интерфейс для открытия окна просмотра поста
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
