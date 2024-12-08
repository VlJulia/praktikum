import {showOverlay} from './modal';
import liked from '../images/liked.svg';
import not_liked from '../images/like.svg';
import trash from '../images/trash.svg';
import {sendLike, delLike} from './fetchFunc/likeSend';
import {delCardSend} from './fetchFunc/cardSend';

const cards = document.querySelectorAll('.card');

//создание карт и напонение

export function newCard(img_url, text, _my, _id, _likes=0 ,like_status= false){
    var card = document.createElement('article');
    card.className = 'card';
    card.my = _my;
    // Создаем кнопку для удаления
    if (_my){
        var trashButton = document.createElement('button');
        trashButton.className = 'card__trash';
        var trashImage = document.createElement('img');
        trashImage.src = trash; // Замените путь к изображению
        trashButton.appendChild(trashImage);
        card.appendChild(trashButton);
    }
    card.id = _id;
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
    if (like_status)  
        {
         likeImage.src = liked;
         likeContainer.classList.add('card__like-container_active');
        }
    else likeImage.src = not_liked; 
    likeImage.alt = 'Лайк';
    likeButton.appendChild(likeImage);
    likeContainer.appendChild(likeButton);

    // Создаем счетчик лайков
    var likeCounter = document.createElement('p');
    likeCounter.className = 'card__like-counter';
    likeCounter.textContent = _likes;
    likeContainer.appendChild(likeCounter);

    // Добавляем контейнер лайков в описание карточки
    cardDescription.appendChild(likeContainer);
    card.appendChild(cardDescription);
    
    // Добавляем карточку в основной контейнер
    likeContainer.addEventListener('click', function() {
        const img= likeContainer.querySelector("img");
        const num= likeContainer.querySelector(".card__like-counter");
        if (likeContainer.classList.contains('card__like-container_active')){
            const new_inf = delLike(card.id).then((res)=>
                {
                    num.textContent = res.likes.length; ;
                    likeContainer.classList.remove('card__like-container_active');
                    img.src = not_liked;
                }
            )
        }
        else{
            sendLike(card.id).then((res)=>
                {
                    num.textContent = res.likes.length; ;
                    likeContainer.classList.add('card__like-container_active');
                    img.src = liked;
                }
            );
        }

    });
    if(_my){
    card.vanDel = false;
    trashButton.addEventListener('click', function() {
        card.classList.add("card_del");
        showOverlay('modal__are-you-sure');
    });
    }
    return card;
};

export function delCard(yes){
    const del = document.querySelector(".card_del");
    if(!del) return;
    if(!del.my) return;
    delCardSend(del.id).then(()=>{
        if (yes){
            setTimeout(()=>{del.style.opacity=0;}, 300);
            setTimeout(()=>{ del.remove();}, 500);
        }
        else{
            del.classList.remove("card_del");
        }
    })
}


export function appendCard(img_url, text, _my, _id="", _likes=0 ,like_status= false){
    const new_card = newCard(img_url, text, _my, _id, _likes, like_status);
    document.querySelector('.content').appendChild(new_card);
}