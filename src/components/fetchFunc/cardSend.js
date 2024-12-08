import {fetch_del_card, fetch_send_card} from './api';

export function delCardSend(id){
    return fetch(fetch_del_card.address+id, fetch_del_card.content)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        console.log(`ERROR ${result.status}: ${result.statusText}`);
        return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
      }
    });
}

export function newCardSend(){
  const content = {
    method:fetch_send_card.content.method,
    headers:fetch_send_card.content.headers,
    body:JSON.stringify({
      name: document.querySelector('#card-name').value,
      link: document.querySelector('#card-img-url').value,
    }),
  }
  return fetch(fetch_send_card.address, content)
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      console.log(`ERROR ${result.status}: ${result.statusText}`);
      return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
    }
  });
}