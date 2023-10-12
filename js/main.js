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

function print(...params) {
  console.log(params);
}
const dataExchange = apiData([renderPictures, print], console.error, null);

dataExchange.select()
  .then((data) => openPicture(data))
  .catch((err)=> console.error('Запрос не выполнен -',err));

//const getAllPictures = renderPictures(25);
//print(picturesAll);
//openPicture(dataExchange.getData());
