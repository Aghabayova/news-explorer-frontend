import apiData from '../utils/ApiData';

export default function getNewsApi(params) {
  
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const sevenDays = date.getDate() - 7;
  date.setDate(sevenDays);
  const weekAgo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const urlApi = apiData.newsApiUrl
    + `apiKey=${apiData.newsApiKey}&`
    + `q=${params}&`
    + `to=${today}&`
    + `from=${weekAgo}&`
    + `pageSize=9`;

    return fetch(urlApi, 

      {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => response)
      .catch(error => error);

  }