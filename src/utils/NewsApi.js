import apiData from '../utils/ApiData';

export function getNewsApi(params) {
    
    const urlApi = apiData.newsApiUrl
                    + `apiKey=${apiData.newsApiKey}&`
                    + `q=${params}&`
                    + `pageSize=100`;
  
    return fetch(urlApi, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
  }