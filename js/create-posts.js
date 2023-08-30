import {
  getRandomNumber
} from './utils.js';
/*
	Генерация данных для задания
*/
const MAX_COMMENTS = 100;
const MAX_COMMENTS_PER_POST = 5;

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

const descriptions = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм',
];

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

function createPosts(maxPosts) {
  const posts = [];

  for (let index = 0; index < maxPosts; index++) {
    posts.push({
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: descriptions[getRandomNumber(0, descriptions.length - 1)],
      likes: getRandomNumber(15, 200),
      comments: getPostComments()
    });
  }
  return posts;
}

export {
  createPosts
};
