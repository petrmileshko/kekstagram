// Получение случайного числа из диапазона между min и max включительно
function getRandomNumber(min, max) {

  if (min === max) {
    return min;
  }

  const from = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const till = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (till - from + 1)) + from;
}

// Проверка длины введенной строки на соблюдение условия не более max
function validateTextLength(text, max) {
  if (text === '' || text === null || text === undefined || max < 1 || typeof (text) !== 'string') {
    return false;
  }

  return text.length <= max;
}


/*
	Генерация данных для задания
*/

const NAMES = [
  'Василий',
  'Иван',
  'Наташа',
  'Оля',
  'Мария'
];
const COMMENTS = new Array(
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!');

function randomComment() {
	return {

	};
}

const photo = {
  id: '',
  url: '',
  description: '',
  likes: '',
  comments: []
};

const comment = {
  id: '',
  avatar: '',
  message: '',
  name: ''
}

console.log(COMMENTS);
console.log(NAMES);
