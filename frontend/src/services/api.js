import axios from 'axios';

const api = axios.create({
   // url base do gitpod
   baseURL: "https://3333-d43e07f5-561d-4f59-b4e8-daa57a09dc94.ws-us02.gitpod.io/"
});

export default api;