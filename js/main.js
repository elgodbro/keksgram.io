'use strict';

let uploadedPhotos = [];

let descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
];

let messagesInComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let names = ['Шура', 'Никифор', 'Тимур', 'Вова', 'Егор', 'Иван', 'Ферапонт', 'Тёма', 'Рома', 'Ирений', 'Паша', 'Влад', 'Саша', 'Боря', 'Володя', 'Лев', 'Слава', 'Макс', 'Абрам', 'Филипп', 'Артур'];

let pictureTemplate = document.querySelector('#picture'), pictureFragment = new DocumentFragment();

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function picturesGenerateDOM(data) {
    // pictureClone.querySelector('.picture__img').src = data[generateNumber(0, data.length - 1)].url;
    // pictureClone.querySelector('.picture__img').alt = data[generateNumber(0, data.length - 1)].description;
    // pictureClone.querySelector('.picture__comments').textContent = data[generateNumber(0, data.length - 1)].comments.length;
    // pictureClone.querySelector('.picture__likes').textContent = data[generateNumber(0, data.length - 1)].likes;

    //Не понимаю зачем разбивать этот фрагмент на две функции,
    //когда можно воспользоваться лишь одной, но видимо так для чего-то нужно

    let picture = picturesSetData(data[generateNumber(0, data.length - 1)].url, data[generateNumber(0, data.length - 1)].description, data[generateNumber(0, data.length - 1)].comments.length, data[generateNumber(0, data.length - 1)].likes);

    pictureFragment.appendChild(picture);
}

function picturesSetData(src, alt, comm, likes) {
    let pictureClone = pictureTemplate.content.cloneNode(true);
    pictureClone.querySelector('.picture__img').src = src;
    pictureClone.querySelector('.picture__img').alt = alt;
    pictureClone.querySelector('.picture__comments').textContent = comm;
    pictureClone.querySelector('.picture__likes').textContent = likes;

    return pictureClone;
}

function loadBigPicture(photo) {
    let bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img>img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    let comments = "";
    photo.comments.forEach(comment => {
        comments += `<li class="social__comment">
        	  <img class="social__picture" src="${comment.avatar}"
        	    alt="${comment.name}"
        	    width="35" height="35">
        	  <p class="social__text">${comment.message}</p>
        </li>`;
    });

    bigPicture.querySelector('.social__comments').innerHTML = comments;

    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
}

for (let i = 1; i <= 25; i++) {
    let comments = [];
    for (let j = 0; j <= generateNumber(0, 3); j++) {
        comments.push({
            avatar: `img/avatar-${generateNumber(1, 6)}.svg`,
            message: messagesInComments[generateNumber(0, messagesInComments.length - 1)],
            name: names[generateNumber(0, names.length - 1)]
        });
    }
    uploadedPhotos.push({
        url: `photos/${generateNumber(1, 25)}.jpg`,
        likes: generateNumber(15, 200),
        description: descriptions[generateNumber(0, descriptions.length - 1)],
        comments: comments
    });

    picturesGenerateDOM(uploadedPhotos);
}

document.querySelector('.pictures').appendChild(pictureFragment);

loadBigPicture(uploadedPhotos[0]);

console.log(uploadedPhotos);