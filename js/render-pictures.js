import {
  createPosts
} from './create-posts.js'; // В качестве параметра принимает значение - количество постов, которое необходимо сгенерировать


const renderPictures = (numberPictures) => {

  const picturesContainer = document.querySelector('.pictures');
  const picturesAll = createPosts(numberPictures);                                                  // генерируем объекты данных
  const templatePictureItem = document.querySelector('#picture').content.querySelector('.picture'); // считываем из шаблона структуру DOM контейнера
  const templateContainer = document.createDocumentFragment();                                      // создаем веременное хранилище DOM элементов

  picturesAll.forEach(({      // перебираем в цикле все объекты данных и формируем новый DOM узел
    url,
    likes,
    comments
  }) => {
    const newPicture = templatePictureItem.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    templateContainer.append(newPicture);   // добавляем помещаем DOM узлы во временное хранилище
  });

  picturesContainer.append(templateContainer); // вставляем полученные DOM узлы из временного хранилище в DOM струтуру документа

  return function () {    // возвращаем функцию интерфес для получния объекта с данными и элементами разметки
    return {
      links: picturesContainer.querySelectorAll('a.picture'),
      elements: picturesAll
    };
  };
};

export {
  renderPictures  //Интерфейс для генерации DOM контейнеров на основе шаблона и передачи данных всех постов
};
