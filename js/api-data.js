/**
 * Получение / отправка данных на сервер
 * onSucssesSelect = [ 'функция для обработки данных', 'функция для вывода на экран результата обработки']
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
          onSucssesSelect[0](data)    //Передаем массив с данными, получаем объект с шаблоном и данными для вывода на экран
        );                            // После объект передаем в интерфейс для вывода на экран

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
