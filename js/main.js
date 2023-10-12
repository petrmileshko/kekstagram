import {
  renderPictures
} from './render-pictures.js'; // В качестве параметра принимает значение - количество постов, которое необходимо сгенерировать
import {
  openPicture
} from './open-picture.js'; // В качестве параметра принимает значение - объект с элементами ссылок на посты и массив объектов постов
import './upload-picture.js'; // Инициализация загрузки изображений
import {
  apiData
} from './api-data.js'; // Получение / отправка данных


const dataExchange = apiData([renderPictures, openPicture], console.log, console.error, null);

dataExchange.select();
