import axios from 'axios';

const api = axios.create({
   baseURL: 'https://3333-cbb3b6de-c968-4b1b-b8d3-c4d1d8771c5c.ws-us02.gitpod.io/' 
});

export default api;