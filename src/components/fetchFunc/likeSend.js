
import {fetch_like_set,fetch_like_unset} from './api'
export function sendLike(id){
  return fetch(fetch_like_set.address+id, fetch_like_set.content)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        console.log(`ERROR ${result.status}: ${result.statusText}`);
        return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
      }
    })
}

export function delLike(id){
  return fetch(fetch_like_unset.address+id, fetch_like_unset.content)
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      console.log(`ERROR ${result.status}: ${result.statusText}`);
      return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
    }
  })
}
