import * as Header from './header.js';
import * as Card from './card.js';
import * as Validate from './validate.js';

const modal_new_card = document.querySelector(".modal__new-card");
const modal_edit_profile = document.querySelector(".modal__profile-edit");
const modal_new_avatar = document.querySelector(".modal__new-avatar");
const modal_are_you_sure = document.querySelector(".modal__are-you-sure");
const overlay = document.querySelector('.overlay');
let del_card=false;

//работа с overlay
function hideOverlay(){
    if (!overlay.classList.contains('show')) return;
    const modal = overlay.querySelector('.show');
    overlay.querySelector('.modal').style.opacity = 0;
    setTimeout(()=>{
        overlay.classList.remove('show');
        modal.classList.remove('show');
    }, 301);
    Card.delCard(del_card);
    del_card=false;
}
export function showOverlay(modal_class){
    overlay.classList.add('show');
    overlay.querySelector('.modal').style.opacity = 1;
    overlay.querySelector(`.${modal_class}`).classList.add('show');

}
overlay.addEventListener('click',  hideOverlay);
overlay.querySelector('.modal__close-button').addEventListener('click',  hideOverlay);
overlay.querySelector(".modal").addEventListener('click', function(event) {
    event.stopPropagation();
});
document.addEventListener('keyup',function (evt)
 {if (evt.key === "Escape") {hideOverlay();}
}
);


//открытие форм
document.querySelector('.add-button').addEventListener('click', function(event) {
    event.stopPropagation();
    showOverlay("modal__new-card");
});
document.querySelector('.profile__avatar-hover').addEventListener('click', function(event){
    event.stopPropagation();
    showOverlay('modal__new-avatar');
});
document.querySelector('.profile__edit-button').addEventListener('click', function(event){
    event.stopPropagation();
    showOverlay('modal__profile-edit');
});

//отправка форм
modal_are_you_sure.addEventListener('click', function(event){
    del_card=true;
    hideOverlay();
});
modal_new_card.addEventListener('submit', function(event){
    event.preventDefault();
    const text =  modal_new_card.querySelector("input[name='card-name']").value;
    const img =  modal_new_card.querySelector("input[name='card-img-url']").value;
    const new_card = Card.newCard(img, text);
    document.querySelector('.content').appendChild(new_card);
    hideOverlay();
});
modal_edit_profile.addEventListener('submit', function(event){
    event.preventDefault();
    const text =  modal_edit_profile.querySelector("input[name='profile-name']").value;
    const about =  modal_edit_profile.querySelector("input[name='profile-about-self']").value;
    document.querySelector('#profile-name').textContent=text;
    document.querySelector('#profile-about-self').textContent=about;
    if (document.querySelector('.profile').classList.contains('profile_open')) {Header.openHeader();}
    if (Header.canOpenHeader()) {
        document.querySelector('.profile').addEventListener('click', Header.openHeader);
        document.querySelector('.profile').style.cursor ="pointer";
    }
    else{
        document.querySelector('.profile').removeEventListener ('click', Header.openHeader);
        document.querySelector('.profile').style.cursor ="unset";
    }
    hideOverlay();
});
modal_new_avatar.addEventListener('submit', function(event){
    event.preventDefault();
    const img =  modal_new_avatar.querySelector("input[name='avatar-img-url']").value;
    document.querySelector('#profile-avatar').src=img;
    hideOverlay();
});




export function change_del_card(card){
    modal_are_you_sure.del_card = card;
}