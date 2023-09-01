import {
  renderPictures
} from './render-pictures.js'; // В качестве параметра принимает значение - количество постов, которое необходимо сгенерировать
import {
  openPicture
} from './open-picture.js'; // В качестве параметра принимает значение - объект с элементами ссылок на посты и массив объектов постов

const getAllPictures = renderPictures(25);

openPicture(getAllPictures());
