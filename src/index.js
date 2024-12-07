
import './styles/index.css';
import liked from './images/liked.svg';
import not_liked from './images/like.svg';
import image_tmpl from './images/card-templ.jpg';
import trash from './images/trash.svg';
console.log('Hello, World!');
const numbers = [2, 3, 5];
let  del_card;
const overlay = document.querySelector('.overlay');

function hideOverlay(){
    overlay.classList.remove('show');
    const modal = overlay.querySelector('.show');
    modal.classList.remove('show');
    del_card = null;
}
function showOverlay(modal_class){
    overlay.classList.add('show');
    overlay.querySelector(`.${modal_class}`).classList.add('show');
}

overlay.addEventListener('click',  hideOverlay);
overlay.querySelector('.close-button').addEventListener('click',  hideOverlay);

overlay.querySelector(".modal").addEventListener('click', function(event) {
    event.stopPropagation();
});

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10

const cards = document.querySelectorAll('.card');

function newCard(img_url, text){
    var card = document.createElement('article');
    card.className = 'card';
    // Создаем кнопку для удаления
    var trashButton = document.createElement('button');
    trashButton.className = 'trash';
    var trashImage = document.createElement('img');
    trashImage.src = trash; // Замените путь к изображению
    trashButton.appendChild(trashImage);
    card.appendChild(trashButton);

    // Создаем изображение карточки
    var cardImage = document.createElement('img');
    cardImage.className = 'card-image';
    cardImage.src = img_url; // Замените путь к изображению
    card.appendChild(cardImage);

    // Создаем описание карточки
    var cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';

    // Создаем название карточки
    var cardName = document.createElement('h4');
    cardName.className = 'card-name';
    cardName.textContent = text; // Замените текст на нужный
    cardDescription.appendChild(cardName);

    // Создаем контейнер для лайка
    var likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';

    // Создаем кнопку лайка
    var likeButton = document.createElement('button');
    likeButton.className = 'like';
    var likeImage = document.createElement('img');
    likeImage.src = not_liked; // Замените путь к изображению
    likeImage.alt = 'Лайк';
    likeButton.appendChild(likeImage);
    likeContainer.appendChild(likeButton);

    // Создаем счетчик лайков
    var likeCounter = document.createElement('p');
    likeCounter.className = 'like-counter';
    likeCounter.textContent = '0'; // Замените число на нужное
    likeContainer.appendChild(likeCounter);

    // Добавляем контейнер лайков в описание карточки
    cardDescription.appendChild(likeContainer);
    card.appendChild(cardDescription);
    
    // Добавляем карточку в основной контейнер
    likeContainer.addEventListener('click', function() {
        const img= likeContainer.querySelector("img");
        const num= likeContainer.querySelector(".like-counter");
        if (likeContainer.classList.contains('active')){
            likeContainer.classList.remove('active');
            img.src = not_liked;
            num.textContent = Number(num.textContent) - 1 ;
        }
        else{
        likeContainer.classList.add('active');
        img.src = liked;
        num.textContent = Number(num.textContent) + 1 ;
        }

    });

    trashButton.addEventListener('click', function() {
        del_card = card;
        showOverlay('are-you-sure');
        //card.remove();
    });

    
    return card;
};

cards.forEach(card => {
    card.querySelector('.trash').addEventListener('click', function() {
        card.remove();
    });

    const like = card.querySelector('.like-container');

    like.addEventListener('click', function() {
        const img= like.querySelector("img");
        const num= like.querySelector(".like-counter");
        if (like.classList.contains('active')){
            like.classList.remove('active');
            img.src = not_liked;
            num.textContent = Number(num.textContent) - 1 ;
        }
        else{
        like.classList.add('active');
        img.src = liked;
        num.textContent = Number(num.textContent) + 1 ;
        }

    });

});
document.querySelector('.add-button').addEventListener('click', function() {
    const card = newCard("https://www.aqua-shop.ru/images/news/nerazluchniki.jpg", "AAAAAAA");
    document.querySelector('.content').appendChild(card);
});

document.querySelector('.avatar-hover').addEventListener('click', function(){
    showOverlay('new-avatar');
});

document.querySelector('.edit-button').addEventListener('click', function(){
    showOverlay('profile-edit');
});

document.querySelector('.add-button').addEventListener('click', function(){
    showOverlay('new-card');
});
document.querySelector(".are-you-sure").querySelector(".modal_button").addEventListener('click', function(){
    if (del_card) {
        del_card.remove();
    }
    hideOverlay();
});
