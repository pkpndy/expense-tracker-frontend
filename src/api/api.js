import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Update to your backend API
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
