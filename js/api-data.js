/**
 * Получение / отправка данных на сервер
 * onSucssesSelect = [ 'функция для вывода данных на главную страницу', 'функция для вывода поста в модальное окно при клике']
 * onSucssesInsert - Функция для обработки успешного завершения отправки данных на сервер
 * onFailApi - Обработка ошибки (чтения/запись данных) и вывод сообщения
 */

function apiData(onSucssesSelect, onSucssesInsert, onFailApi) {

  return {

    select: async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
      try {
        const responce = await fetch(endPoint);

        if (!responce.ok) {
          throw new Error(`Ошибка загрузки: ${responce.status} - ${responce.statusText}`);
        }

        const data = await responce.json();
        onSucssesSelect[1](
          onSucssesSelect[0](data)    //Передаем массив с данными для вывода на страницу, получаем объект с шаблоном ссылок и данными
        );                            // Передаем объект для инициализации событий по клику на пост для последующего его октрытия в модальном окне

      } catch (error) {
        onFailApi(error);
      }
    },
    insert: async function (body = null, endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
      try {

        if (body === null) {
          throw new Error('Нет данных для передачи на сервер');
        }

        const responce = await fetch(endPoint, {
          Method: 'POST',
          body
        });

        if (!responce.ok) {
          throw new Error(`Ошибка отправки: ${responce.status} - ${responce.statusText}`);
        }

        const data = await responce.json();
        onSucssesInsert(data);

      } catch (error) {
        onFailApi(error);
      }
    }
  };
}

export {
  apiData
};
