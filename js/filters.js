/**
 * Фильтр для управления постами пользователей
 */
import {
  debounce
} from './utils.js';

let loadedPictures = [];
let pictureLinks;

function filters(data, cbPictures, cbPictureModal) {
  const containerFilters = document.querySelector('.img-filters');
  const cbDebounce = debounce(render);

  containerFilters.classList.remove('img-filters--inactive');
  containerFilters.addEventListener('click', onFilterClick);

  loadedPictures = [...data];
  pictureLinks = cbPictures(loadedPictures).links;

  cbPictureModal({
    links: pictureLinks,
    elements: loadedPictures
  });

  function render(cbFilter = null) {
    clearData();
    if (cbFilter) {
      pictureLinks = cbPictures(loadedPictures.slice().sort(cbFilter)).links;
      cbPictureModal({
        links: pictureLinks,
        elements: loadedPictures
      });
    } else {
      pictureLinks = cbPictures(loadedPictures).links;
      cbPictureModal({
        links: pictureLinks,
        elements: loadedPictures
      });
    }
  }

  function onFilterClick(evt) {

    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      switchFilter(evt.target.id);
    }
  }

  function switchFilter(filter) {
    switch (filter) {
      case 'filter-random':
        cbDebounce(randomFilter);
        break;
      case 'filter-discussed':
        cbDebounce(popularFilter);
        break;
      case 'filter-default':
        cbDebounce();
        break;
      default:
        break;
    }
  }

  function randomFilter() {
    return Math.random() - 0.5;
  }

  function popularFilter(postFirst, postSecond) {
    return postSecond.comments.length - postFirst.comments.length;
  }

  function clearData() {
    pictureLinks.forEach((element) => {
      element.remove();
    });
  }
}

export {
  filters
};
