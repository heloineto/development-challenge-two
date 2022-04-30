import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3fbmy904ja.execute-api.sa-east-1.amazonaws.com/Prod/',
});

export default api;
