import configData from '../utils/Config';

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
    createArticle(keyword, date, title, text, source, link, image) {
        return fetch(`${this._url}/articles`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
                body: JSON.stringify({
                    keyword, title, text, date, source, link, image
                })
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
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
}

//создаем экземпляр класса Api
const api = new Api({
    baseUrl: configData.baseUrl,
    headers: {
        //  authorization: apiData.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    }
});

export default api;