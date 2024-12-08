
import '../styles/index.css';
import './modal';
import {cardFetch,userFetch}  from './fetchFunc/loadData';
import {appendCard} from './card';
const cards = await cardFetch();
const user_inf = await userFetch();

cards.forEach(element => {
    const liked = element.likes.some(item => item._id === user_inf._id);
    const my = element.owner._id === user_inf._id;
    appendCard(element.link, element.name, my, element._id, element.likes.length, liked);

});
document.querySelector('#profile-avatar').src = user_inf.avatar;
document.querySelector('#profile-name').textContent = user_inf.name;
document.querySelector('#profile-about-self').textContent = user_inf.about;