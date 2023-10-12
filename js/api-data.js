/**
 * Получение / отправка данных на сервер
 */


function apiData(onSucssesApi, onFailApi, body = null) {
  let dataRaw;
  return {

    select: async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
      try {
        const responce = await fetch(endPoint);

        if (!responce.ok) {
          throw new Error(`Ошибка загрузки: ${responce.status} - ${responce.statusText}`);
        }

        const data = await responce.json();
        dataRaw = onSucssesApi[0](data);
        return dataRaw;

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
        onSucssesApi[1](data);

      } catch (error) {
        onFailApi(error);
      }
    }
  };
}

export {
  apiData
};
