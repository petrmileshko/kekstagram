/**
 * Получение / отправка данных на сервер
 * onSucssesSelect = [ 'функция для вывода данных на главную страницу', 'функция для вывода поста в модальное окно при клике']
 * onSucssesInsert - Функция для обработки успешного завершения отправки данных на сервер
 * onFailApi - Обработка ошибки (чтения/запись данных) и вывод сообщения
 */

const ApiData = function (onSuccesReading, onFailSelect) {


  this.select = async function (endPoint = 'https://25.javascript.pages.academy/kekstagram/data') {
    try {
      const responce = await fetch(endPoint);

      if (!responce.ok) {
        throw new Error(`Ошибка загрузки данных с сервера: ${responce.status}`);
      }

      const data = await responce.json();

      if (data === null || data === undefined) {
        throw new Error('Данные с сервера загружены с ошибкой!');
      }

      onSuccesReading(data);

    } catch (error) {
      onFailSelect(error.message);
    }
  };

  this.insert = async function (onSubmitEvent, data = null, endPoint = 'https://25.javascript.pages.academy/kekstagram') {
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

      onSubmitEvent(true, 'Изображение успешно загружено');

    } catch (error) {
      onSubmitEvent(false, error.message);
    }
  };

};

export {
  ApiData
};
