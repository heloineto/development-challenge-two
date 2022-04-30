import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dl0v9p4cid.execute-api.sa-east-1.amazonaws.com/Prod/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
