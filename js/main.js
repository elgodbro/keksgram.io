'use strict';

const uploadedPhotos = [];

const IMAGES_COUNT = 25;
const USERS_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 4;

const descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
];

const messagesInComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = ['Шура', 'Никифор', 'Тимур',
               'Вова', 'Егор', 'Иван',
               'Ферапонт', 'Тёма', 'Рома',
               'Ирений', 'Паша', 'Влад',
               'Саша', 'Боря', 'Володя',
               'Лев', 'Слава', 'Макс',
               'Абрам', 'Филипп', 'Артур'];

const pictureTemplate = document.querySelector('#picture');
const pictureFragment = new DocumentFragment();


function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function picturesGenerateDOM(data) {
    for (let k = 0; k < data.length; k++) {
        pictureFragment.appendChild(picturesSetData(data[k]));
    }
}

function picturesSetData(data) {
    let pictureClone = pictureTemplate.content.cloneNode(true);
    pictureClone.querySelector('.picture__img').src = data.url;
    pictureClone.querySelector('.picture__img').alt = data.description;
    pictureClone.querySelector('.picture__comments').textContent = data.comments.length;
    pictureClone.querySelector('.picture__likes').textContent = data.likes;

    return pictureClone;
}

function loadBigPicture(photo) {
    const bigPicture = document.querySelector('.big-picture');

    bigPicture.querySelector('.big-picture__img>img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    const comments = photo.comments.map(comment => {
        return `<li class="social__comment">
          <img class="social__picture" src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
          <p class="social__text">${comment.message}</p>
        </li>`;
      }).join('');

    bigPicture.querySelector('.social__comments').innerHTML = comments;

    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
}

for (let i = 1; i <= IMAGES_COUNT; i++) {
    let comments = [];
    for (let j = 0; j <= generateNumber(0, MAX_COMMENTS); j++) {
        comments.push({
            avatar: `img/avatar-${generateNumber(1, USERS_COUNT)}.svg`,
            message: messagesInComments[generateNumber(0, messagesInComments.length)],
            name: names[generateNumber(0, names.length)],
        });
    }
    uploadedPhotos.push({
        url: `photos/${i}.jpg`,
        likes: generateNumber(MIN_LIKES, MAX_LIKES),
        description: descriptions[generateNumber(0, descriptions.length)],
        comments: comments
    });
}

picturesGenerateDOM(uploadedPhotos);
document.querySelector('.pictures').appendChild(pictureFragment);

loadBigPicture(uploadedPhotos[0]);

console.log(uploadedPhotos);