const my_autorisation_id = "5b389ee7-47f8-4494-8297-89d50c623772";
const group_id = "frontend-st-cohort-201";
const address_templ =`https://nomoreparties.co/v1/${group_id}`;
function templ(_method, _body) {
    return({
    method: _method,
    headers: {
      authorization: my_autorisation_id,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(_body),
    }
    )
}
function templ_no_body(_method) {
    return({
    method: _method,
    headers: {
      authorization: my_autorisation_id,
    },
    }
    )
}
const get_templ={headers: {authorization: my_autorisation_id,}};



export const fetch_get_cards = {
    address: `${address_templ}/cards`,
    content: get_templ,
};
export const fetch_get_user = {
    address: `${address_templ}/users/me`,
    content: get_templ,
};
export const fetch_like_set = {
    address: `${address_templ}/cards/likes/`,
    content: templ_no_body("PUT"),
}
export const fetch_like_unset = {
    address: `${address_templ}/cards/likes/`,
    content: templ_no_body("DELETE"),
}

export const fetch_edit_profile_info = {
    address: `${address_templ}/users/me`,
    content: templ("PATCH", {
        name: document.querySelector("#profile-name-edit").value,
        about: document.querySelector("#profile-about-self-edit").value,
    }),
}

export const fetch_edit_profile_avatar = {
    address: `${address_templ}/users/me/avatar`,
    content: templ("PATCH", {
        avatar: document.querySelector("#profile-avatar").src,
    }),
}

export const fetch_del_card = {
    address: `${address_templ}/cards/`,
    content: templ_no_body("DELETE"),
}

export const fetch_send_card = {
    address: `${address_templ}/cards`,
    content: templ("POST",
        {
            name: document.querySelector('#card-name').value,
            link: document.querySelector('#card-img-url').value,
        }
    ),
}