import apiData from '../utils/ApiData';

export default function getNewsApi(params) {

  const date = new Date();
  const todayDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');
  date.setDate(date.getDate() - 7);
  const startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');

  const urlApi = apiData.newsApiUrl
    + `apiKey=${apiData.newsApiKey}&`
    + `q=${params}&`
    + `to=${todayDate}&`
    + `from=${startDate}&`
    + `pageSize=9`;
  return fetch(urlApi,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);

}