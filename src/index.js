
import './styles/index.css';
import liked from './images/liked.svg';
import not_liked from './images/like.svg';
import image_tmpl from './images/card-templ.jpg';
import trash from './images/trash.svg';
const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');
const modal_new_card = document.querySelector(".new-card");
const modal_edit_profile = document.querySelector(".profile-edit");
const modal_new_avatar = document.querySelector(".new-avatar");
let  del_card;


function hideOverlay(){
    if (!overlay.classList.contains('show')) return;
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


document.querySelector('.add-button').addEventListener('click', function(event) {
    event.stopPropagation();
    showOverlay("new-card");
});
document.querySelector('.avatar-hover').addEventListener('click', function(event){
    event.stopPropagation();
    showOverlay('new-avatar');
});
document.querySelector('.edit-button').addEventListener('click', function(event){
    event.stopPropagation();
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

modal_new_card.querySelector(".modal_button").addEventListener('click', function(event){
    event.preventDefault();
    const text =  modal_new_card.querySelector("input[name='card-name']").value;
    const img =  modal_new_card.querySelector("input[name='card-img-url']").value;
    const new_card = newCard(img, text);
    document.querySelector('.content').appendChild(new_card);
    hideOverlay();
});
modal_edit_profile.querySelector(".modal_button").addEventListener('click', function(event){
    event.preventDefault();
    const text =  modal_edit_profile.querySelector("input[name='profile-name']").value;
    const about =  modal_edit_profile.querySelector("input[name='profile-about-self']").value;
    document.querySelector('#profile-name').textContent=text;
    document.querySelector('#profile-about-self').textContent=about;
    if (document.querySelector('.profile').classList.contains('profile-open')) {openHeader();}
    if (canOpenHeader()) {
        document.querySelector('.profile').addEventListener('click', openHeader);
        document.querySelector('.profile').style.cursor ="pointer";
    }
    else{
        document.querySelector('.profile').removeEventListener ('click', openHeader);
        document.querySelector('.profile').style.cursor ="unset";
    }
    hideOverlay();
});
modal_new_avatar.querySelector(".modal_button").addEventListener('click', function(event){
    event.preventDefault();
    const img =  modal_new_avatar.querySelector("input[name='avatar-img-url']").value;
    document.querySelector('#profile-avatar').src=img;
    hideOverlay();
});
function checkInputs(inputs,submitButton) {
    const allFilled = Array.from(inputs).every(input => input.checkValidity());
    // Устанавливаем состояние кнопки
    submitButton.disabled = !allFilled;
}

Array.from(document.querySelector(".modal").children).forEach((modal)=>{
    const inputs = modal.querySelectorAll('input:not([type="submit"]');
    if(inputs){
        const submit = modal.querySelector('.modal_button');
        inputs.forEach((inp)=>{
            inp.addEventListener('input', function(){
                const status = inp.checkValidity();
                if (!status && inp.value!=""){
                    if (!inp.parentElement.classList.contains("error")) inp.parentElement.classList.toggle("error");
                }
                else if (inp.parentElement.classList.contains("error")) inp.parentElement.classList.toggle("error");
                checkInputs(inputs, submit);
                });
        });
    }
})


document.addEventListener('keyup',function (evt)
 {if (evt.key === "Escape") {hideOverlay();}
}
);
function canOpenHeader(){
    const element1 = document.querySelector('.description');
    const element2= document.querySelector('.profile-name');
    return !((element1.scrollWidth <= element1.clientWidth)&&(element2.scrollWidth <= element2.clientWidth)) ;
};

function openHeader(){
    if (document.querySelector('.profile').classList.contains('profile-open')) {
        document.querySelector('.profile').classList.remove('profile-open');
        setTimeout(() => {
            document.querySelector('.profile').classList.remove('profile-column');
        },1000);
        return;
    }
    document.querySelector('.profile').classList.add('profile-hide');
    setTimeout(() => {
        document.querySelector('.profile').classList.add('profile-column');
        document.querySelector('.profile').classList.remove('profile-hide');
        document.querySelector('.profile').classList.add('profile-open');
    },500);
};