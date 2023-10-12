import {
  renderPictures
} from './render-pictures.js'; // В качестве параметра принимает массив с постами, полученный с сервера
import {
  openPicture
} from './open-picture.js'; // В качестве параметра принимает значение - объект с элементами ссылок на посты и массив объектов постов
import './upload-picture.js'; // Подготовка поста и изображения в модальном окне для отправки на сервер
import {
  apiData
} from './api-data.js'; // Получение / отправка данных (первый аргумент массив из двух элементов, первый интерфейс отрисовки превью постов на главной, второй элемент интерфейс вывода поста в модальное окно)


const dataExchange = apiData([renderPictures, openPicture], console.log, console.error);

dataExchange.select();
