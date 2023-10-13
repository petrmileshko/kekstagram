/**
 * Получение / отправка данных на сервер
 * onSucssesSelect = [ 'функция для вывода данных на главную страницу', 'функция для вывода поста в модальное окно при клике']
 * onSucssesInsert - Функция для обработки успешного завершения отправки данных на сервер
 * onFailApi - Обработка ошибки (чтения/запись данных) и вывод сообщения
 */

function apiData(onSucssesSelect, onFailSelect) {

  return {

    select: async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
      try {
        const responce = await fetch(endPoint);

        if (!responce.ok) {
          throw new Error(`Ошибка загрузки данных с сервера: ${responce.status} - ${responce.statusText}`);
        }

        const data = await responce.json();

        if ( data === null || data === undefined ) {
          throw new Error('Данные с сервера загружены с ошибкой!');
        }

        onSucssesSelect[1](
          onSucssesSelect[0](data) //Передаем массив с данными для вывода на страницу, получаем объект с шаблоном ссылок и данными
        ); // Передаем объект для инициализации событий по клику на пост для последующего его октрытия в модальном окне

      } catch (error) {
        onFailSelect(error.message);
      }
    },
    insert: async function (onSubmitEvent, data = null, endPoint = 'https://25.javascript.pages.academy/kekstagram') {
      try {

        if (data === null) {
          throw new Error('Нет данных для передачи на сервер');
        }

        const responce = await fetch(endPoint, {
          method: 'POST',
          body: data
        });

        if (!responce.ok) {
          throw new Error(`Ошибка отправки: ${responce.status} - ${responce.statusText}`);
        }

        onSubmitEvent(true, 'Данные отправлены');

      } catch (error) {
        onSubmitEvent(false, error);
      }
    }
  };
}

export {
  apiData
};
