'use strict';

const IMAGES_COUNT = 25;
const USERS_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 4;

const Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
};

const uploadedPhotos = [];

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

const names = [
    'Шура', 'Никифор', 'Тимур',
    'Вова', 'Егор', 'Иван',
    'Ферапонт', 'Тёма', 'Рома',
    'Ирений', 'Паша', 'Влад',
    'Саша', 'Боря', 'Володя',
    'Лев', 'Слава', 'Макс',
    'Абрам', 'Филипп', 'Артур',
];


function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generatePicturesDOM(photos) {   
    const pictureFragment = new DocumentFragment();
    const pictureTemplate = document.querySelector('#picture');
    const picturesContainer = document.querySelector('.pictures');

    function setPictureData(picture, index) {
        const pictureClone = pictureTemplate.content.cloneNode(true);
        
        pictureClone.querySelector('.picture__img').dataset.imageIndex = index;
        pictureClone.querySelector('.picture__img').src = picture.url;
        pictureClone.querySelector('.picture__img').alt = picture.description;
        pictureClone.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureClone.querySelector('.picture__likes').textContent = picture.likes;

        return pictureClone;
    }

    photos.forEach((picture, index) => {
        pictureFragment.appendChild(setPictureData(picture, index));
    });

    picturesContainer.addEventListener('click', onBigPictureClick);
    document.addEventListener('keydown', onPicturesContainerKeydown);
    picturesContainer.appendChild(pictureFragment);
}

function loadBigPicture(photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.social__comments').innerHTML = buildComments(photo.comments);

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
}

function buildComments(comments) {
    return comments.map(comment => {
        return `<li class="social__comment">
          <img class="social__picture" src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
          <p class="social__text">${comment.message}</p>
        </li>`;
      }).join('');
}

for (let i = 1; i <= IMAGES_COUNT; i++) {
    const comments = [];
    const commentsCount = generateNumber(0, MAX_COMMENTS);

    for (let j = 0; j <= commentsCount; j++) {
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

//Обработчик загрузки изображений
const uploadImg = document.querySelector('.img-upload__form');
const uploadImgInput = uploadImg.querySelector('#upload-file');
const uploadImgOverlay = uploadImg.querySelector('.img-upload__overlay');
const cancelUploadBtn = uploadImgOverlay.querySelector('.img-upload__cancel');
const previewUploadImg = uploadImg.querySelector('.img-upload__preview img');

uploadImgInput.addEventListener('change', () => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        previewUploadImg.src = reader.result;
    });

    const file = uploadImgInput.files[0];
    const allowedExtensions = ['jpg', 'png', 'jpeg'];

    if (!allowedExtensions.includes(file.name.split('.')[1])) {
        alert('Недопустимый формат файла');
        uploadImgInput.value = '';
        return;
    }

    reader.readAsDataURL(uploadImgInput.files[0]);
    showEditForm();

    console.log(uploadImgInput.files[0])
});


function showEditForm() {
    uploadImgOverlay.classList.remove('hidden');
    cancelUploadBtn.addEventListener('click', onCancelUploadBtnClick);
    document.addEventListener('keydown', onEditFormKeydown);
}

function onCancelUploadBtnClick() {
    uploadImgOverlay.classList.add('hidden');
    cancelUploadBtn.removeEventListener('click', onCancelUploadBtnClick);
    document.removeEventListener('keydown', onEditFormKeydown);
    uploadImg.reset();
}

function onEditFormKeydown(evt) {
    if (evt.key === Key.ESCAPE) {
        evt.preventDefault();
        onCancelUploadBtnClick();
    }
}


//Открытие картинки в полном размере
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

function onBigPictureClick(evt) {
    if (evt.target.classList.contains('picture__img')) {
        loadBigPicture(uploadedPhotos[evt.target.dataset.imageIndex]);
        closeButton.addEventListener('click', onCloseButtonClick);
        document.addEventListener('keydown', onBigPictureKeydown);
    }
}

function onPicturesContainerKeydown(evt) {
    if (evt.key === Key.ENTER) {
        const targetImage = evt.target.querySelector('.picture__img');
        loadBigPicture(uploadedPhotos[targetImage.dataset.imageIndex]);
        closeButton.addEventListener('click', onCloseButtonClick);
        document.addEventListener('keydown', onBigPictureKeydown);
    }
}

function onCloseButtonClick() {
    bigPicture.classList.add('hidden');
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onBigPictureKeydown);
}

function onBigPictureKeydown(evt) {
    if (evt.key === Key.ESCAPE) {
        evt.preventDefault();
        onCloseButtonClick();
    }
}

generatePicturesDOM(uploadedPhotos);
console.log(uploadedPhotos);