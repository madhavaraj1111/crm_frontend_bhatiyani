//src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Change this in production
});

export default api;
