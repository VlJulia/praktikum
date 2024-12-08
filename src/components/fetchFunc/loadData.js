import {fetch_get_cards, fetch_get_user} from './api'
export function cardFetch(){
    return fetch(fetch_get_cards.address, fetch_get_cards.content)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        console.log(`ERROR ${result.status}: ${result.statusText}`);
        return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
      }
    })
      .then((result) => {
        return result;
  }); 
}
export function userFetch(){
    return fetch(fetch_get_user.address, fetch_get_user.content)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          console.log(`ERROR ${result.status}: ${result.statusText}`);
          return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
        }
      })
        .then((result) => {
          return result;
    }); 
}
