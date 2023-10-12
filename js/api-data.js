/**
 * Получение / отправка данных на сервер
 */


function apiData(onSucssesSelect, onSucssesInsert, onFailApi, body = null) {

  return {

    select: async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
      try {
        const responce = await fetch(endPoint);

        if (!responce.ok) {
          throw new Error(`Ошибка загрузки: ${responce.status} - ${responce.statusText}`);
        }

        const data = await responce.json();
        onSucssesSelect[1](onSucssesSelect[0](data));

      } catch (error) {
        onFailApi(error);
      }
    },
    insert: async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
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
