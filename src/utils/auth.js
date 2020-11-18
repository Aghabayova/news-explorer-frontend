import apiData from '../utils/ApiData';


export const authorise = (email, password) => {
  return fetch(`${apiData.baseUrl}/signin`, {
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
      } 
      else if (res.statusCode === 400) {
        return res.validation.body;
      } else if (res.message) {
        return res;
      }
    })
    .catch(error => {
      console.log('error');
    })
};


export const register = (email, password, name) => {
  return fetch(`${apiData.baseUrl}/signup`, {
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
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
}

export const getContent = () => {
  return fetch(`${apiData.baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => {
        console.log(error);
    })
}