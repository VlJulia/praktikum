import {showOverlay} from './modal';
import liked from '../images/liked.svg';
import not_liked from '../images/like.svg';
import image_tmpl from '../images/card-templ.jpg';
import trash from '../images/trash.svg';
const cards = document.querySelectorAll('.card');
//создание карт и напонение
cards.forEach(card => {
    card.querySelector('.card__trash').addEventListener('click', function() {
        card.remove();
    });

    const like = card.querySelector('.card__like-container');

    like.addEventListener('click', function() {
        const img= like.querySelector("img");
        const num= like.querySelector(".card__like-counter");
        if (like.classList.contains('card__like-container_active')){
            like.classList.remove('card__like-container_active');
            img.src = not_liked;
            num.textContent = Number(num.textContent) - 1 ;
        }
        else{
        like.classList.add('card__like-container_active');
        img.src = liked;
        num.textContent = Number(num.textContent) + 1 ;
        }

    });

});

export function newCard(img_url, text){
    var card = document.createElement('article');
    card.className = 'card';
    // Создаем кнопку для удаления
    var trashButton = document.createElement('button');
    trashButton.className = 'card__trash';
    var trashImage = document.createElement('img');
    trashImage.src = trash; // Замените путь к изображению
    trashButton.appendChild(trashImage);
    card.appendChild(trashButton);

    // Создаем изображение карточки
    var cardImage = document.createElement('img');
    cardImage.className = 'card__image';
    cardImage.src = img_url; // Замените путь к изображению
    card.appendChild(cardImage);

    // Создаем описание карточки
    var cardDescription = document.createElement('div');
    cardDescription.className = 'card__description';

    // Создаем название карточки
    var cardName = document.createElement('h4');
    cardName.className = 'card__name';
    cardName.textContent = text;
    cardDescription.appendChild(cardName);

    // Создаем контейнер для лайка
    var likeContainer = document.createElement('div');
    likeContainer.className = 'card__like-container';

    // Создаем кнопку лайка
    var likeButton = document.createElement('button');
    likeButton.className = 'card__like';
    var likeImage = document.createElement('img');
    likeImage.src = not_liked; 
    likeImage.alt = 'Лайк';
    likeButton.appendChild(likeImage);
    likeContainer.appendChild(likeButton);

    // Создаем счетчик лайков
    var likeCounter = document.createElement('p');
    likeCounter.className = 'card__like-counter';
    likeCounter.textContent = '0';
    likeContainer.appendChild(likeCounter);

    // Добавляем контейнер лайков в описание карточки
    cardDescription.appendChild(likeContainer);
    card.appendChild(cardDescription);
    
    // Добавляем карточку в основной контейнер
    likeContainer.addEventListener('click', function() {
        const img= likeContainer.querySelector("img");
        const num= likeContainer.querySelector(".card__like-counter");
        if (likeContainer.classList.contains('card__like-container_active')){
            likeContainer.classList.remove('card__like-container_active');
            img.src = not_liked;
            num.textContent = Number(num.textContent) - 1 ;
        }
        else{
        likeContainer.classList.add('card__like-container_active');
        img.src = liked;
        num.textContent = Number(num.textContent) + 1 ;
        }

    });
    card.vanDel = false;
    trashButton.addEventListener('click', function() {
        card.classList.add("card_del");
        showOverlay('modal__are-you-sure');
    });

    return card;
};

export function delCard(yes){
    const del = document.querySelector(".card_del");
    if(!del) return;
    if (yes){
        setTimeout(()=>{del.style.opacity=0;}, 300);
        setTimeout(()=>{ del.remove();}, 500);
    }
    else{
        del.classList.remove("card_del");
    }
}


