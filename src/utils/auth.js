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
    .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw new Error('не передано одно из полей');
        }
        if (res.status === 401) {
          throw new Error('пользователь с email не найден');
        }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data
      }
      else{
        return data
      }
    })
    .catch((err) => console.log(err));
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
        console.log(res);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    });
}

export const getContent = (token) => {
  return fetch(`${apiData.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err));
};
