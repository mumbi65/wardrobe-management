import axios from "axios";

const API_BASE_URL = "https://wardrobe-backend-y3po.onrender.com"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;