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
const MAX_COMMENTS = 100;
const MAX_COMMENTS_PER_POST = 5;
const MAX__POSTS = 25;

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

const idUsed = [getRandomNumber(1, MAX_COMMENTS)];

function getIdComment() {
  const newId = idUsed[idUsed.length - 1] + 1;
  idUsed.push(newId);
  return newId;
}

function getComment() {
  return {
    id: getIdComment(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };
}

function getPostComments() {
  const comments = [];
  const numberComments = getRandomNumber(1, MAX_COMMENTS_PER_POST);
  for (let index = 0; index < numberComments; index++) {
    comments.push(getComment());
  }

  return comments;
}

function getPosts() {
  const posts = [];

  for (let index = 0; index < MAX__POSTS; index++) {
    posts.push({
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo dolorem totam, sint in quis odit ratione aliquam earum esse soluta dolores dolorum ex sed inventore.',
      likes: getRandomNumber(15, 200),
      comments: getPostComments()
    });
  }
  return posts;
}

console.log(getPosts());
