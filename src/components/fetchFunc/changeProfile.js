import {fetch_edit_profile_info, fetch_edit_profile_avatar} from './api';

export function changeProfileInfo(){
    const content = {
        method:fetch_edit_profile_info.content.method,
        headers:fetch_edit_profile_info.content.headers,
        body:JSON.stringify({
            name: document.querySelector("#profile-name-edit").value,
            about: document.querySelector("#profile-about-self-edit").value,
        }),
      };

    return fetch(fetch_edit_profile_info.address, content)
    .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          console.log(`ERROR ${result.status}: ${result.statusText}`);
          return Promise.reject(`ERROR ${result.status}: ${result.statusText}`);
        }
      })
}


export function changeProfileAvatar(_avatar){
    fetch(fetch_edit_profile_avatar.address, fetch_edit_profile_avatar.content);
}

