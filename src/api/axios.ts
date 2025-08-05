//src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crm-backend-bhatiyani.onrender.com', // Change this in production
});

export default api;
