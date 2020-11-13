export const BASE_URL = 'https://api.my-practicum.ru';


export function authorise(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  .then((res => res.json()))
    .then(res => {
      if (res.data) {
        return res;
      } else if (res.status === 400) {
        throw new Error('не передано одно из полей');
      } else if (res.message) {
        return res;
      }
    })
    .catch(e => {
      return console.log(e)
    })
};



export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ email, password, name })
  })
    .then(res => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
}

export function getContent(){
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentilas: 'include',
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.log('not authorised');
    })
}