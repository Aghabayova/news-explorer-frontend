import apiData from '../utils/ApiData';

class Api {

    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getArticles() {
        return fetch(`${this._url}/articles`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            });
    }

    //Добавление новой статьи на сервер
    createArticle(category, date, title, text, source, link, image) {
        return fetch(`${this._url}/articles`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                category, title, text, date, source, link, image
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                })
        })
    }

    //Удаление статьи
    deleteArticle(id) {
        return fetch(`${this._url}/articles/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }
    /*
        //получить данные пользователя
        getUserInfo() {
            return fetch(`${this._url}/users/me`, {
                headers: this._headers,
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Что-то пошло не так: ${res.status}`);
                    }
                });
        }
    
        //обновить данные юзера
        editUserInfo(userData) {
            return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: userData.name,
                    about: userData.about
                }),
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Что-то пошло не так: ${res.status}`);
                    }
                });
        }
    
        //Добавление Лайков
        changeLikeCardStatus(id, status) {
            return fetch(`${this._url}/articles/saves/${id}`, {
                method: `${(status) ? `PUT` : `DELETE`}`,
                headers: this._headers,
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                })
        }
   
    //Удаление Лайков
    deleteLike(card) {
        return fetch(`${this._url}/articles/saves/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }
     */
}

//создаем экземпляр класса Api
const api = new Api({
    baseUrl: apiData.baseUrl,
    headers: {
        //  authorization: apiData.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    }
});

export default api;