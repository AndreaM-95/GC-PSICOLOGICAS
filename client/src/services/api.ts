import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // tu backend NestJS
  //withCredentials: true,            // si usas cookies
});

export default api;
