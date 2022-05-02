import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tjridck02j.execute-api.sa-east-1.amazonaws.com/Prod/',
});

export default api;
