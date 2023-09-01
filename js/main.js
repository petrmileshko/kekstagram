import {
  renderPictures
} from './render-pictures.js'; // В качестве параметра принимает значение - количество постов, которое необходимо сгенерировать
import {
  openPicture
} from './open-picture.js'; // В качестве параметра принимает значение - коллекцию элементов ссылок на посты

const getAllPictures = renderPictures(25);

openPicture(getAllPictures());
