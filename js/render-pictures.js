import {
  createPosts
} from './create-posts.js'; // В качестве параметра принимает значение - количество постов, которое необходимо сгенерировать


const renderPictures = (numberPictures) => {

  const picturesContainer = document.querySelector('.pictures');
  const picturesAll = createPosts(numberPictures);
  const templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
  const templateContainer = document.createDocumentFragment();

  picturesAll.forEach(({
    url,
    likes,
    comments
  }) => {
    const newPicture = templatePictureItem.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    templateContainer.append(newPicture);
  });

  picturesContainer.append(templateContainer);

  return function () {
    return {
      links: picturesContainer.querySelectorAll('a.picture'),
      elements: picturesAll
    };
  };
};


export {
  renderPictures
};
