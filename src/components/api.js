export {
    editProfile,
    addNewCard,
    likeRequest,
    addNewAvatar,
    deleteCardRequest,
};
import { fillUserProfile, fillCards } from "../scripts/index";

const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
    headers: {
        authorization: "61ce8f8a-84ad-4bc8-a812-43ad64b812b9",
        "Content-Type": "application/json",
    }
};

const userPromise = new Promise((resolve, reject) => {
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then((res) => {
            if (res.ok) {
                resolve(res.json());
            } else {
                reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const cardsPromise = new Promise((resolve, reject) => {
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then((res) => {
            if (res.ok) {
                resolve(res.json());
            } else {
                reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const promises = [userPromise, cardsPromise];

Promise.all(promises).then((results) => {
    fillUserProfile(results[0]);
    fillCards(results[1]);
});

const editProfile = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`ошибка: ${res.status}`);
            }
            return res.json();
        })
};

const addNewCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`ошибка: ${res.status}`);
            }
            return res.json();
        })
};

const likeRequest = (cardId, method) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers,
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`ошибка: ${res.status}`);
            }
            return res.json();
        })
};

const addNewAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`ошибка: ${res.status}`);
            }
            return res.json();
        })
};

const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`ошибка: ${res.status}`);
            }
            return res.json();
        })
};
