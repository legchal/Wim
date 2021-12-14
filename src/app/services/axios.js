import axios from 'axios';

  let baseURL = 'http://127.0.0.1:3333/';

  if(process.env.NODE_ENV === 'production') {    
    baseURL = 'https://api.admin.wimdental.com/';
  }

  let api = axios.create({ baseURL, headers: {
    Authorization: `Bearer ${localStorage.getItem('@token')}`
  } });



export default api;